const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');


// const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
// res.cookie('jwtoken', token, {
//   httpOnly: true, // Prevent client-side access to the cookie
//   secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
//   sameSite: 'lax', // Adjust for CSRF protection
//   maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time
// });

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    if (!token) throw new Error('Token not found');

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({ 
      _id: verifyToken._id,
      'tokens.token': token 
    });

    if (!rootUser) throw new Error('User not found');

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next(); // Pass control to the next middleware
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ error: 'Unauthorized: Invalid token or user not logged in' });
  }
};

module.exports = Authenticate;





// const jwt = require('jsonwebtoken');
// const User = require('../model/userSchema');

// const Authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtoken;
//     if (!token) throw new Error('Token not found');

//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//     const rootUser = await User.findOne({ _id: verifyToken._id, 'tokens.token': token });

//     if (!rootUser) throw new Error('User not found');

//     req.token = token;
//     req.rootUser = rootUser;
//     req.userId = rootUser._id;

//     next(); // Pass control to the next middleware
//   } catch (err) {
//     console.error('Authentication error:', err.message);
//     res.status(401).json({ error: 'Unauthorized: Invalid token or user not logged in' });
//   }
// };

// module.exports = Authenticate;




// const jwt = require('jsonwebtoken');
// const User = require('../model/userSchema');

// const Authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtoken; // Get token from cookies
//     if (!token) throw new Error('Token not found');

//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
//     const rootUser = await User.findOne({
//       _id: verifyToken._id,
//       'tokens.token': token,
//     });

//     if (!rootUser) throw new Error('User not found');

//     req.token = token;
//     req.rootUser = rootUser;
//     req.userId = rootUser._id;

//     next(); // Pass control to the next middleware
//   } catch (err) {
//     console.error('Authentication error:', err.message);
//     res.status(401).json({ error: 'Unauthorized: Invalid token or user not logged in' });
//   }
// };

// module.exports = Authenticate;






// const jwt = require("jsonwebtoken");
// const User = require("../model/userSchema");

// const Authenticate = async (req, res, next) => {
//   try {
//     console.log("Cookies received:", req.cookies); // Log all cookies received

//     if (!req.cookies || !req.cookies.jwtoken) {
//       throw new Error("Token not found in cookies");
//     }

//     const token = req.cookies.jwtoken;
//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

//     const rootUser = await User.findOne({
//       _id: verifyToken._id,
//       "tokens.token": token,
//     });

//     if (!rootUser) {
//       throw new Error("User not found in the database");
//     }

//     req.token = token;
//     req.rootUser = rootUser;
//     req.userId = rootUser._id;

//     next();
//   } catch (err) {
//     console.error("Authentication Error:", err.message);
//     res.status(401).json({ error: `Unauthorized: ${err.message}` });
//   }
// };

// module.exports = Authenticate;







// const jwt = require("jsonwebtoken");
// const User = require("../model/userSchema");

// const Authenticate = async (req,res,next) =>{

//     try{

    
//     const token = req.cookies.jwtoken;
//     const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
//     const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})
//     if(!rootUser){
//         throw new Error("User Not Found!");
//     }
//     req.token = token;
//     req.rootUser = rootUser;
//     req.userId = rootUser._id;
//     next();
// }
// catch(err){
//     console.log("Something went wrong.");
// }
// }

// module.exports = Authenticate;