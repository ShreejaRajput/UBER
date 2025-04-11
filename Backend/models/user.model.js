const mongoose=require('mongoose');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be atleat 3 character long'],


        },
        lastname:{
            type:String,
            minlength:[3,'Last name must be atleat 3 character long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be atleast 5 characters long']
    },
    password:{
            type:String,
            required:true,
            select:false,
            // minlength:[8,'Password must be atleast 8 characters long'],
    },

    socletId:{
        type:String,
    },
})

userSchema.methods.generAuthToken=function(){
    const token=jwt.sign({_id: this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
