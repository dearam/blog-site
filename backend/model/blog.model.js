const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true 
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    categories: {
        type: [String], 
        default: []
    },
    tags: {
        type: [String], 
        default: []
    },
    likes: {
        type: Number,
        default: 0 
    },
    body: {
        type: String,
        required: true, 
        trim: true 
    },
    quotes: {
        type: String, 
        default: ""
    },
    image: {
        type: String, 
        required:false,
    }
});

module.exports = mongoose.model("Blog",BlogSchema);