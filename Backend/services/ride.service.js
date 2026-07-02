const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');
const {sendMessageToSocketId} = require('../socket');

async function getFare(pickup, destination) {
if(!pickup || !destination) {
    throw new Error('Pickup and destination are required');
}

const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
console.log('distanceTime result:', distanceTime); // ADD THIS
const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20
};

const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8
};

const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5
};

const fare = {
    auto: Math.round(baseFare.auto + (distanceTime.distance.value / 1000 * perKmRate.auto) + (distanceTime.duration.value / 60 * perMinuteRate.auto)),
    car: Math.round(baseFare.car + (distanceTime.distance.value / 1000 * perKmRate.car) + (distanceTime.duration.value / 60 * perMinuteRate.car)),
    motorcycle: Math.round(baseFare.motorcycle + (distanceTime.distance.value / 1000 * perKmRate.motorcycle) + (distanceTime.duration.value / 60 * perMinuteRate.motorcycle)),
};

return fare;
}
module.exports.getFare = getFare;


function getOtp(num){
    function generateOtp(num){
    const otp=crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num));

    return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({ userId, pickup, destination, vehicleType }) => {
    
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        userId,       
        pickup,
        destination,
        vehicleType,
        fare: fare[vehicleType],
        otp: getOtp(6)
    });
    return ride;
}


module.exports.confirmRide = async ({rideId, captainId}) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

  await rideModel.findOneAndUpdate(
  { _id: rideId },
  { status: 'accepted', captain: captainId }   // ← assign captain here
);
    // console.log('rideId:', rideId, typeof rideId);

    const ride = await rideModel.findById(rideId)
        .populate('userId')
        .populate('captain').select('+otp');  // ← capital C

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};

module.exports.startRide = async ({ rideId, otp, captainId }) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }
    const ride = await rideModel.findOne({ _id: rideId })
        .populate('userId')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride is not in accepted state');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    await rideModel.findOneAndUpdate(
        { _id: rideId, captain: captainId },
        { status: 'ongoing' }
    );
    // socket emit removed — controller handles it
    return ride;
};

module.exports.endRide = async ({ rideId, captainId }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }
    const ride = await rideModel.findOne({ _id: rideId, captain: captainId })
        .populate('userId')
        .populate('captain')
        .select('+otp');

        if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not in ongoing state');
    }
     await rideModel.findOneAndUpdate(
        { _id: rideId, captain: captainId },
        { status: 'completed' }
    );
    return ride;
    

}

module.exports.getOtp = getOtp;
