import React, { useContext, useEffect, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SocketContext } from '../context/SocketContext';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

const defaultViewState = {
  longitude: 72.5714,
  latitude: 23.0225,
  zoom: 13,
};

const LiveTracking = ({ ride }) => {
  const { socket } = useContext(SocketContext);

  const [viewState, setViewState] = useState(defaultViewState);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // ===========================
  // Update user's location every 10 seconds
  // ===========================
  useEffect(() => {
    if (!navigator.geolocation) return;

    const updateUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nextLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(nextLocation);

          // Center map on user only if captain location is not available
          if (!captainLocation) {
            setViewState((prev) => ({
              ...prev,
              latitude: nextLocation.lat,
              longitude: nextLocation.lng,
            }));
          }
        },
        (error) => {
          console.error('Error fetching user location:', error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    };

    // Fetch immediately
    updateUserLocation();

    // Fetch every 10 seconds
    const interval = setInterval(updateUserLocation, 1000);

    return () => clearInterval(interval);
  }, [captainLocation]);

  // ===========================
  // Listen for captain location updates
  // ===========================
  useEffect(() => {
    if (!socket) return;

    const handleCaptainLocation = (data) => {
      if (data?.location) {
        const nextLocation = {
          lat: data.location.lat,
          lng: data.location.lng,
        };

        setCaptainLocation(nextLocation);

        // Center map on captain
        setViewState((prev) => ({
          ...prev,
          latitude: nextLocation.lat,
          longitude: nextLocation.lng,
        }));
      }
    };

    socket.on('captain-location-updated', handleCaptainLocation);

    return () => {
      socket.off('captain-location-updated', handleCaptainLocation);
    };
  }, [socket]);

  // ===========================
  // Initial captain location from ride
  // ===========================
  useEffect(() => {
    if (ride?.captain?.location) {
      const nextLocation = {
        lat: ride.captain.location.ltd,
        lng: ride.captain.location.lng,
      };

      setCaptainLocation(nextLocation);

      setViewState((prev) => ({
        ...prev,
        latitude: nextLocation.lat,
        longitude: nextLocation.lng,
      }));
    }
  }, [ride]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-gray-200">
      {!MAPBOX_TOKEN ? (
        <div className="flex h-full items-center justify-center bg-gray-100 p-4 text-center text-sm text-gray-600">
          Add a Mapbox token in VITE_MAPBOX_TOKEN to see the live map.
        </div>
      ) : (
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={viewState}
          viewState={viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          <NavigationControl position="top-right" />

          {/* User Marker */}
          {userLocation && (
            <Marker
              longitude={userLocation.lng}
              latitude={userLocation.lat}
              color="#2563eb"
            />
          )}

          {/* Captain Marker */}
          {captainLocation && (
            <Marker
              longitude={captainLocation.lng}
              latitude={captainLocation.lat}
              color="#16a34a"
            />
          )}
        </Map>
      )}
    </div>
  );
};

export default LiveTracking;