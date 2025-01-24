const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('../middleware/Authenticate')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require:true
    },
    work: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require:true
    },
    cpassword:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                require:true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: String,
                require:true
            },
            work: {
                type: String,
                require: true
            },
            message:{
                type:String,
                require:true
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
    

});

//stored this message

userSchema.methods.addMessage = async function (name,email,phone,work,message){
    try{
        this.messages = this.messages.concat({name,email,phone,work,message});
        await this.save();
        // console.log("use methods working");
        return this.messages;
    }catch(err){
        console.log(err);
    }
}


// userSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password =await bcrypt.hash(this.password,12);
//         this.cpassword =await bcrypt.hash(this.cpassword,12);
//     }
//     next(); //for next operate that save function run...
// });


userSchema.pre('save', async function (next) {
    // try{ }
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12); // Await the promise
            this.cpassword = await bcrypt.hash(this.cpassword, 12); // Await the promise
        }
        next(); // Call next to proceed with the save operation
     
    // catch (err) {
    //     next(err); // Pass the error to the next middleware
    // }
});
//authentication that exact user login or not..

userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('UUSER',userSchema);

module.exports = User;