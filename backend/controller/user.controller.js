const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let profile= req.body.profile;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const record = await User.findOne({ email: email });
    if (record) {
        return res.status(400).send({
            message: "Email is already registered"
        });
    } else {
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            profile:profile
        });

        const result = await user.save();
        const { _id } = await result.toJSON();
        const token = jwt.sign({ _id: _id }, "secret");

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send({
            message: "success"
        });
    }
}

const userInfo = async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, "secret");

        if (!claims) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }

        const user = await User.findOne({ _id: claims._id });
        const { password, ...data } = await user.toJSON();
        res.send(data);
    } catch (err) {
        res.status(401).send({
            message: "Unauthenticated"
        });
    }
}

const userLogout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({
        message: "log out success",
    });
}

const userLogin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({
            message: "user not found"
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send({
            message: "Password is incorrect"
        });
    }

    const token = jwt.sign({ _id: user._id }, "secret");

    res.cookie("jwt", token, {
        maxAge: 1 * 60 * 60 * 1000 // Set to 1 day
    });

    res.status(200).send({
        message: "success"
    });
}

const getAllUser = async(req,res)=>{
    try{
        const users= await User.find();
        res.status(200).json(users);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};

const editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        } else {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            updateData.password = user.password;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        const { password, ...userData } = updatedUser.toObject();

        res.status(200).json({ message: 'Data updated successfully', user: userData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteUser= async(req,res)=>{
    try{
        const result=await User.findByIdAndDelete(req.params.id);
        if(!result){
            return res.status(404).json({message:"error on deleting"});
        }
        return res.status(200).json({message:"successfully deleted"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports = { registerUser, userInfo, userLogout, userLogin , getAllUser, editUser, deleteUser};

