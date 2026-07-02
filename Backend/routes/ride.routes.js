const express=require('express');
const router=express.Router();
const {body, query,validationResult}=require('express-validator');
const rideController=require('../controllers/ride.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const captainMiddleware=require('../middlewares/captain.middleware');
const authCaptainMiddleware=require('../middlewares/captain.middleware');

router.post(
  '/create',
  authMiddleware.authUser,
  [
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('dropoff').isString().isLength({ min: 3 }).withMessage('Invalid Dropoff location'),
    body('vehicleType').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
  ],
  rideController.createRide
)

router.get('/get-fare', 
  authMiddleware.authUser, 
[
  query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  query('dropoff').isString().isLength({ min: 3 }).withMessage('Invalid dropoff address')
],
  rideController.getFare);

router.post('/confirm',
  captainMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride ID'),
  rideController.confirmRide
);


router.get('/start-ride',
  authCaptainMiddleware.authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride ID'),
  query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
  rideController.startRide
);

router.post('/end-ride',
  captainMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride ID'),
  rideController.endRide
);

module.exports=router;