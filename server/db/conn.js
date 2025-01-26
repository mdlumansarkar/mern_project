
const mongoose = require('mongoose');

const db = process.env.DATABASE; // Get the connection string from the .env file
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((err) => {
    console.error("No Connection.", err);
  });
    
    
    
    
    
    
    // dotenv.config({path:'./config.env'});
    
    //Database Connection
    
    // const db = process.env.DATABASE;
    //  = 'mongodb+srv://mdlumansarkar478:mdlumansarkar@test-pro-db.v1gpb.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db'


