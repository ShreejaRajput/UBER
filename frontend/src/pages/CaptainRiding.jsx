import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'
import FinishRide from '../context/FinishRide'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../Components/LiveTracking'

const CaptainRiding = () => {

  const location = useLocation();
  const ride = location.state?.ride || null;

  const[finishRidePanel,setfinishRidePanelPanel]=useState(false);
  const finishRidePanelRef=useRef(null)
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!socket || !captain?._id) return;

    socket.emit('join', {
      userType: 'captain',
      userId: captain._id
    });

    const emitLocation = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    };

    const locationInterval = setInterval(emitLocation, 10000);
    emitLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain?._id]);

useGSAP(function(){
if(finishRidePanel){
gsap.to(finishRidePanelRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(finishRidePanelRef.current,{
  transform:'translateY(100%)'
})

}
},[finishRidePanel])



  return (
  <div>
      
      <div className='h-screen relative'>

        
        <div className='fixed w-full p-6 top-0 flex items-center justify-between z-50'>
          <img className='w-16 z-50' src="Uber-logo.png" alt="" />
        <Link to='/captain-home' className='z-50 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
  <i className="ri-logout-box-line text-black text-xl "></i>
</Link>
        </div>


      <div className='relative h-4/5'>
        {/* <img
        className='h-full w-full object-cover absolute top-0 left-0 z-0'
        src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt="" /> */}

        <LiveTracking ride={ride} />

        {/* {ride && (
          <div className='absolute top-24 left-4 right-4 z-40 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500'>Active ride</p>
                <h3 className='text-lg font-semibold text-black'>
                  {ride?.user?.fullname?.firstname || ride?.userId?.fullname?.firstname || 'Passenger'}
                </h3>
              </div>
              <div className='rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-black'>
                ₹{ride?.fare}
              </div>
            </div>

            <div className='mt-3 space-y-2 text-sm text-gray-700'>
              <div className='flex items-start gap-2'>
                <i className='ri-map-pin-line mt-0.5 text-base'></i>
                <p>{ride?.pickup}</p>
              </div>
              <div className='flex items-start gap-2'>
                <i className='ri-map-pin-4-line mt-0.5 text-base'></i>
                <p>{ride?.destination}</p>
              </div>
            </div>
          </div>
        )} */}
      </div>
      
      <div className='h-1/5 relative p-6 bg-yellow-400 flex items-center justify-between'
      onClick={()=>{
        setfinishRidePanelPanel(true)
      }}>

      <h5 className='p-3 text-center w-[95%] absolute top-0' onClick={()=>{

       }}> <i className="text-3xl text-black ri-arrow-up-s-line"></i></h5>
          <div>
            <h4 className='text-xl font-semibold'>
              {ride ? 'Ride in progress' : '4 min away'}
            </h4>
            {ride?.otp && (
              <p className='text-sm text-black/70'>OTP: {ride.otp}</p>
            )}
          </div>
          <button className=' text-black bg-green-600 text-gray-700 font-semibold p-3 px-10 rounded-lg mt-1'>Complete Ride</button>
      </div>

    
    </div>


    <div ref={finishRidePanelRef}  className='fixed z-10 bottom-0 h-[90%] translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <FinishRide 
       ride={ride}
       setfinishRidePanelPanel={setfinishRidePanelPanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
