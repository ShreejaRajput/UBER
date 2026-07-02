const axios = require('axios');
const captainModel = require('../models/captain.model');




module.exports.getAddressCoordinated = async (address) => {
    const apiKey = process.env.MAPBOX_API_KEY;

    if (!address || typeof address !== 'string') {
        throw new Error('Address must be a non-empty string');
    }

    if (!apiKey) {
        throw new Error('Mapbox API key is not configured');
    }

    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data.features || data.features.length === 0) {
        throw new Error('Geocoding failed: No results found');
    }

    const location = data.features[0].geometry.coordinates;

    return {
        ltd: location[1],
        lng: location[0],
    };
};

module.exports.getDistanceAndTime = async (origin, destination) => {
   
    const apiKey = process.env.MAPBOX_API_KEY;

    if (!origin || !destination) {
        throw new Error('Origin and destination must be non-empty strings');
    }

    if (!apiKey) {
        throw new Error('Mapbox API key is not defined');
    }

    // First convert addresses to coordinates
    const originCoords = await module.exports.getAddressCoordinated(origin);
    const destCoords = await module.exports.getAddressCoordinated(destination);

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?access_token=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data.routes || data.routes.length === 0) {
        throw new Error('No route found');
    }

    const route = data.routes[0];

    return {
        distance: {
            text: `${(route.distance / 1000).toFixed(1)} km`,
            value: route.distance
        },
        duration: {
            text: `${Math.round(route.duration / 60)} mins`,
            value: route.duration
        }
    };
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.MAPBOX_API_KEY;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${apiKey}&autocomplete=true&limit=5`;

    try {
        const response = await axios.get(url);
        
        if (!response.data.features || response.data.features.length === 0) {
            return [];
        }

        // Return clean suggestions list
        return response.data.features.map(feature => ({
            name: feature.place_name,
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0]
        }));

    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch suggestions');
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        'location.ltd': { $ne: null },
        'location.lng': { $ne: null }
    });

    console.log('All captains with location:', captains.length, captains);

    const nearCaptains = captains.filter(captain => {
        const R = 6371;
        const dLat = (captain.location.ltd - ltd) * Math.PI / 180;
        const dLng = (captain.location.lng - lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(ltd * Math.PI / 180) * Math.cos(captain.location.ltd * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        console.log(`Captain ${captain._id} distance: ${distance.toFixed(2)} km`);
        return distance <= radius;
    });

    console.log('Captains in radius:', nearCaptains.length, nearCaptains);
    return nearCaptains;
};