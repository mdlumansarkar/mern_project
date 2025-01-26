
const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


// Load environment variables
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests (Must be before routes!)
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Import and use the auth routes
const authRoutes = require('./router/auth');
app.use(authRoutes);

// Database Connection
require('./db/conn');

//User create
// const User = require('./model/userSchema');

// Example routes
app.get('/', (req, res) => {
    res.send('This is not matter how to celebrate!');
    console.log("This also running, don't worry!");
});

// app.get('/about', (req, res) => {
//     res.send('This is about');
// });

app.get('/contact', (req, res) => {
    res.send('This is Contact.');
    res.cookie("test","jwtoken");
});

app.post('/register', (req, res) => {
    res.send('This is Signin/Register.');
});

app.get('/logout', (req, res) => {
    res.send('This is Logout');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// const port = process.env.PORT;

// app.use(require('./router/auth'));


// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path:'./config.env'});
// //Database Connection
// // const db = process.env.DATABASE;
// // // const db = process.env.DATABASE;
// // //  = 'mongodb+srv://mdlumansarkar478:mdlumansarkar@test-pro-db.v1gpb.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db'
// // mongoose.connect(db).then(()=>{
    // //     console.log('connection successful.');
    // // }).catch((err)=>
        // // console.log('No connection.'));
    
    
// require(`./db/conn`);
// // app.use(authRoutes);
// // Middleware to parse JSON requests
// app.use(express.json());

// // Import and use the router
// // const authRoutes = require('./router/auth');
// // app.use(authRoutes);


// app.get('/',(req,res)=>{
//     res.send('This is not matter how to celebrate!');
//     console.log("This also running,don't worry!");
// });

// // const middleware = (req,res,next) =>{
// //     console.log("This is middleware.");
// //     next();
// // }
// // middleware();

// app.get('/about',(req,res)=>{
//     res.send('This is about');
// });
// app.use(express.json());

// app.get('/contact',(req,res)=>{
//     res.send('This is Contact.');
// });

// app.post('/registers',(req,res)=>{
//     res.send('This is Signin/Register.');
// });
// app.get('/logout',(req,res)=>{
//     res.send('This is Logouttt');
// });



// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// });



