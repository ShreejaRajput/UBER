const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel=require('../models/blacklistTokens.model');



module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const { fullname, email, password } = req.body;

        const isUser=await userModel.findOne({email});
        if(isUser){
            return res.status(400).json({message:'User already exists'});
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        if (!user) {
            return res.status(500).json({ message: 'User creation failed' });
        }

        const token = user.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: 'Token generation failed' });
        }

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Registration failed',
            error: error.message 
        });
    }


}

module.exports.loginUser = async (req, res) => {
    const errors=validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;

const user=await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token=user.generateAuthToken();
    res.cookie('token',token);


    res.status(200).json({token,user});

}


module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json({user:req.user});
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    res.clearCookie('token');

    if (token) {
        await blacklistTokenModel.create({ token });
    }

    res.status(200).json({ message: 'Logout successful' });
};

