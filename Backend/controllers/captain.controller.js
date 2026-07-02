const captainModel=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');
const blacklistTokenModel=require('../models/blacklistTokens.model');

module.exports.registerCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password,vehicle}=req.body;

    const isCaptainExists=await captainModel.findOne({email});
    if(isCaptainExists){
        return res.status(400).json({message:'Captain already exists'});
    }


    const hashedPassword=await captainModel.hashPassword(password);

    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
        
    });

    const token=await captain.generateAuthToken();
    res.status(201).json({captain,captain:token});
}

module.exports.loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find captain by email and include password in the result
        const captain = await captainModel.findOne({ email }).select('+password');

        // If captain not found, return error
        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare provided password with hashed password
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate authentication token
        const token = captain.generateAuthToken();
        
        // Return success response with token and captain data
        res.status(200).json({ 
            token, 
            captain: {
                id: captain._id,
                email: captain.email,
                fullname: captain.fullname
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed',
            error: error.message 
        });
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        res.clearCookie('token');
        
        // Get token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        // Blacklist the token if it exists
        if (token) {
            await blacklistTokenModel.create({ token });
        }
        
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ 
            message: 'Logout failed',
            error: error.message 
        });
    }
}

module.exports.getCaptainProfile = async (req, res) => {

    res.status(200).json({
        captain: req.captain
    })

}
