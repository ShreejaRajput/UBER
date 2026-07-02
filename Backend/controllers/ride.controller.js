 const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, dropoff, vehicleType } = req.body;

    try{
        const ride = await rideService.createRide({userId: req.user._id, pickup, destination: dropoff, vehicleType});
        
        const pickupCoordinates=await mapService.getAddressCoordinated(pickup);
        console.log('Pickup Coordinates:', pickupCoordinates);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd, 
            pickupCoordinates.lng, 
            10);
            // ride.otp="";

            const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('userId');


            captainsInRadius.map(async (captain) => {

                console.log(captain,ride);
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data:  rideWithUser
                })
            });
        
       return res.status(201).json({ message: 'Ride created successfully', ride });

    } catch (error) {
        console.error('Error creating ride:', error);
       return res.status(500).json({ error: 'Failed to create ride' });
    }
};

module.exports.getFare=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, dropoff } = req.query;

    try {
        const fare = await rideService.getFare(pickup, dropoff);
        res.status(200).json({ fare });
    } catch (error) {
        console.error('Error calculating fare:', error);
        res.status(500).json({ error: 'Failed to calculate fare' });
    }
}

module.exports.confirmRide=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({rideId, captainId: req.captain._id});

        sendMessageToSocketId(ride.userId.socketId, {
            event: 'ride-confirmed',
            // data: {
            //     rideId: ride._id,   
            //     captainId: req.captain._id,
            //     captainName: req.captain.name,
            //     captainVehicle: req.captain.vehicle,
            // }
            data:ride
        });

        res.status(200).json({ message: 'Ride confirmed successfully', ride });
    } catch (error) {
        console.error('Error confirming ride:', error);
        res.status(500).json({ error: 'Failed to confirm ride' });
    }
}

module.exports.startRide=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({rideId, captainId: req.captain._id, otp});    
        sendMessageToSocketId(ride.userId.socketId, {
            event: 'ride-started',
            data:ride
        });
        res.status(200).json({ message: 'Ride started successfully', ride });
    } catch (error) {
        console.error('Error starting ride:', error);
        res.status(500).json({ error: 'Failed to start ride' });
    }
}

module.exports.endRide=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({rideId, captainId: req.captain._id});    
        sendMessageToSocketId(ride.userId.socketId, {
            event: 'ride-ended',
            data:ride
        });



        res.status(200).json({ message: 'Ride ended successfully', ride });
    } catch (error) {
        console.error('Error ending ride:', error);
        res.status(500).json({ error: 'Failed to end ride' });
    }
}