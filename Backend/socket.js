const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model');

let io = null;
const connectedSockets = new Map();

function initializeSocket(server) {
    try {
        const { Server } = require('socket.io');

        io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        io.on('connection', (socket) => {
           console.log(`Socket connected: ${socket.id}`);

            socket.on('join',async(data) => {

                const { userId, userType } = data;
                console.log(`User ${userId} of type ${userType} joined with socket ID: ${socket.id}`);

                if(userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });    
                } else if(userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }

            })

            socket.on('update-location-captain',async(data)=>{
                const { userId, location } = data;

                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error',{message:'Invalid location data'});
                }

                const updatedCaptain = await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                }, { new: true });

                const activeRide = await rideModel.findOne({
                    captain: userId,
                    status: { $in: ['accepted', 'on_going'] }
                }).populate('userId');

                if (activeRide?.userId?.socketId) {
                    io.to(activeRide.userId.socketId).emit('captain-location-updated', {
                        captainId: updatedCaptain._id,
                        rideId: activeRide._id,
                        location: {
                            lat: location.ltd,
                            lng: location.lng
                        }
                    });
                }
            });


            socket.on('disconnect', () => {
               console.log(`Socket disconnected: ${socket.id}`);
            });
        });

        return io;
    } catch (error) {
        console.warn('Socket.IO is not installed. Socket support is disabled.', error.message);
        return null;
    }
}

function sendMessageToSocketId(socketId, messageObject) {
    console.log('Sending to socketId:', socketId, '| event:', messageObject.event);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.IO not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
