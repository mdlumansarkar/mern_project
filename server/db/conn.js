
const mongoose = require('mongoose');

const db = process.env.DATABASE;
mongoose.connect(db).then(()=>{
    console.log('connection successful.');
}).catch((err)=>
    console.log('No Connection.',err));
    
    
    
    
    
    
    
    // dotenv.config({path:'./config.env'});
    
    //Database Connection
    
    // const db = process.env.DATABASE;
    //  = 'mongodb+srv://mdlumansarkar478:mdlumansarkar@test-pro-db.v1gpb.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db'


