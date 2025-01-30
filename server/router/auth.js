const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const Authenticate = require("../middleware/Authenticate");

require("../db/conn");
const User = require("../model/userSchema");

// Route to handle registration
router.post('/register',async (req, res) => {
    const {name,email,work,phone,password,cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Plz filled data properly!"});
    }
try{
   
    const UserExist = await User.findOne({email:email});
    if(UserExist){
        return res.status(422).json({error:"User Already Exist!"});
    }
    else if(password != cpassword){
        res.status(422).json({message:"Password does not match!"});
    }
    else{
    const user = new User({name,email,work,phone,password,cpassword});
    // something cookking for hash password
    const register = await user.save();
    
    if(register){
        res.status(201).json({message:"User registration succesfully done."});
    }else{
        res.status(501).json({messsage:"Failed to register."});
    }
}
}catch(err){
    console.log(err);
}

    
    
    // User.findOne({email:email}).then((userExist)=>{
    //     if(userExist){
    //         return res.status(422).json({error:"User Already Exist!"});
    //     }

    //     const user = new User({name,email,work,password,cpassword});
    //     user.save().then(()=>{
    //         res.status(201).json({message:"User registration succesfulyy"});
    //     }).catch((err)=>{
    //         res.status(500).json({message:"Failed to register."});
    //     });

    // }).catch(err=>{console.log(err)});

    // console.log("message received:",req.body); // Log request body
    // res.json({message:req.body});
    // console.log(name);
    // console.log(email);
    // res.status(200).json({ message: 'Registration successful', data: req.body });
});


//Login Route

router.post('https://mern-project-3-cg8m.onrender.com/getData/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(422).json({ message: "Please provide all required fields" });
      }
  
      const userLogin = await User.findOne({ email: email });
      if (!userLogin) {
        return res.status(422).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.status(422).json({ message: "Invalid credentials" });
      }
  
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 200000000), // Cookie expiration: 30 days
        httpOnly: true,
      });
  
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

// router.post('/signin',async(req ,res)=>{
//     try{
//         // let token;
//         const {email,password} = req.body;
//         if(!email || !password){
//             res.status(422).json({message:"Plz Data Filled Properly!"});
//         }
//         const userLogin = await User.findOne({email:email});
//         if(userLogin){
//             const isMatch = await bcrypt.compare(password,userLogin.password);
//             // res.status(422).json({message:"Data not found!"});
//             let token = await userLogin.generateAuthToken();
//             //Cookies
//             res.cookie("jwtoken",token,{
//                 expires:new Date(Date.now() +  2592000000),
//                 httpOnly:true
//             })
//             console.log(token);
//             if(!isMatch){
//                 res.status(422).json({message:"Invalid Credintials!"}); 
//             }else{
//                 res.status(200).json({message:"User Signin Succesfully!"}); 
    
//             }
//         }else{
//             res.status(422).json({message:"Data Not found!"});

//         }

        
        
//     }catch(err){
//         console.log(err);
//     }
// }


// );


router.get('https://mern-project-3-cg8m.onrender.com/getData/contact', Authenticate, (req, res) => {
  // Assuming `req.rootUser` contains the authenticated user
  if (!req.rootUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  

  
  res.send(req.rootUser);



  // res.status(200).json({
  //   // message: 'About page data',
  //   // users: req.rootUser,
    
  // });
});



router.get('https://mern-project-3-cg8m.onrender.com/getData/about', Authenticate, (req, res) => {
  // Assuming `req.rootUser` contains the authenticated user
  if (!req.rootUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  

  
  res.send(req.rootUser);
  // res.status(200).json({
  //   // message: 'About page data',
  //   // users: req.rootUser,
    
  // });
});

//making about router page



router.get('https://mern-project-3-cg8m.onrender.com/getData/getData', Authenticate, (req, res) => {
  // Assuming `req.rootUser` contains the authenticated user
  if (!req.rootUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  console.log("Hello my contact");
  res.send(req.rootUser);
  // res.status(200).json({
  //   // message: 'About page data',
  //   // users: req.rootUser,
    
  // });
});


router.post('https://mern-project-3-cg8m.onrender.com/getData/contact', Authenticate,async (req, res) => {
 
 try{
  const {name,email,phone,work,message} = req.body;
  if( !name || !email || !phone || !work || !message ){
    console.log("Error from the contact form.");
    return res.json({error:"Plz filled the values properly"}); //problem is here...
  }

  const userContact = await User.findOne({_id:req.userId});
  if(!userContact)
  {
    res.status(422).json({message:"Data not found!"});
  }
    else{
      const userMessage  = await userContact.addMessage(name,email,phone,work,message);
      // if(!userMessage){console.log("Not working userMessage of auth.js")};
      await userContact.save();
      // res.status(201).json({message:"come here.."});
    res.status(201).json({message:"Message Sucessfully Sent."});
  }
 }catch(err){
  console.log(err);
 }
 
 
 
 
 
 
 
 
 
  // // Assuming `req.rootUser` contains the authenticated user
  // if (!req.rootUser) {
  //   return res.status(401).json({ error: 'User not authenticated' });
  // }
  // console.log("Hello my contact");
  // res.send(req.rootUser);
  // // res.status(200).json({
  // //   // message: 'About page data',
  // //   // users: req.rootUser,
    
  // // });
});


router.get('/logout', (req, res) => {
  // Assuming `req.rootUser` contains the authenticated user
  // if (!req.rootUser) {
  //   return res.status(401).send({ error: 'User not authenticated' });
  // }

  res.clearCookie('jwtoken',{path:'/'});

  console.log("Hello my contact");
  res.status( ).send('User Logout');
  // res.status(200).json({
  //   // message: 'About page data',
  //   // users: req.rootUser,
    
  // });
});




module.exports = router;





// // const express = require('express');
// // const router = express.Router();

// // // Example route
router.get('/', (req, res) => {
    res.send('Hello world from the auth router.');
});

// // router.get('/register', (req, res) => {
// //     console.log('Request received at /register'); // Debug log
// //     console.log('Request body:', req.body);       // Log the request body
// //     res.json({ message: 'Registration successful', data: req.body });
// //     res.send(req.body);
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();

// // Route to handle registration
// router.post('/register', (req, res) => {
//     console.log('Request received:', req.body);
//     res.status(200).json({ message: 'Request processed' });
// });

// module.exports = router;


