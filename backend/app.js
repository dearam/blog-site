var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var cors=require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter  = require('./routes/auth');
var blogRouter  = require('./routes/blog');

var app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  credentials:true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));


const uri = 'mongodb+srv://ramprasath2709:VzqO4gOwC8kcWYcF@cluster0.4bc146d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Database connection error:', err));


const storage=multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,'uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
})
const upload=multer({
  storage:storage,
  limits:{fileSize:10*1024*1024}
})

if(!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}

app.post('/upload',upload.single('file'),(req,res)=>{
  if(!req.file){
    return res.status(400).send('no file uploaded');
  }
  console.log("file uploaded successfully");
})

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth",authRouter);
app.use("/blog",blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  if (req.originalUrl.startsWith('/api')) { // Assuming your API routes start with /api
    return res.status(err.status || 500).json({ message: err.message });
  }
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
