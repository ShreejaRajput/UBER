const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    
    const error = validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
     }

     const { address } = req.query;
    try{
        const coordinates = await mapService.getAddressCoordinated(address);
        res.status(200).json(coordinates);

    }catch(error){
          console.log('Maps Error:', error.message);
    res.status(404).json({message: error.message});
    }
}
   

module.exports.getDistanceAndTime = async (req, res) => {

    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
        }

        const { origin, destination } = req.query;

        const destanceTimre = await mapService.getDistanceAndTime(origin, destination);
        res.status(200).json(destanceTimre);

    }catch(error){
        console.log('Maps Error:', error.message);
        res.status(500).json({message: error.message});
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res,next) => {

    try{

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);

    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Failed to fetch suggestions'});
    }
}