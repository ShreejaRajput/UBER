import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { useEffect,useContext } from 'react'
import{SocketContext} from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {

const[ridePopUpPanel,setRidePopUpPanel]=useState(false);
const[confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);

const ridePopUpPanelRef=useRef(null)
const confirmRidePopUpPanelRef=useRef(null)
const [ride,setRide]=useState(null);

const{socket}=useContext(SocketContext);
const {captain}=useContext(CaptainDataContext);

useEffect(() => {
    socket.emit("join", {
        userType: "captain",
        userId: captain._id
    });

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log({ userId: captain._id, location: { ltd: position.coords.latitude, lng: position.coords.longitude } });
                socket.emit("update-location-captain", {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
            });
        }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    socket.on('new-ride', (data) => {
        console.log('New ride request received:', data);
        setRide(data);
         setRidePopUpPanel(true);  // ← show the popup
    });




    console.log('Socket listener registered for new-ride'); 

    return () => {
        clearInterval(locationInterval);  // ← cleanup interval
        socket.off('new-ride');           // ← cleanup listener
    };
}, []);


async function confirmRide(){

  const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,
    {
      rideId:ride._id.toString(),
      captainId:captain._id
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
setRidePopUpPanel(false);
setConfirmRidePopUpPanel(true);
}





useGSAP(function(){
if(ridePopUpPanel){
gsap.to(ridePopUpPanelRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(ridePopUpPanelRef.current,{
  transform:'translateY(100%)'
})

}
},[ridePopUpPanel])



useGSAP(function(){
if(confirmRidePopUpPanel){
gsap.to(confirmRidePopUpPanelRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(confirmRidePopUpPanelRef.current,{
  transform:'translateY(100%)'
})

}
},[confirmRidePopUpPanel])




  return (
    <div>
      <div className='h-screen'>
        <div className='fixed w-full p-6 top-0 flex items-center justify-between z-50'>
          <img className='w-16 z-50' src="Uber-logo.png" alt="" />
        <Link to='/home' className='z-50 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
  <i className="ri-logout-box-line text-black text-xl "></i>
</Link>
        </div>


      <div className='relative h-3/5'>
        <img
        className='h-full w-full object-cover absolute top-0 left-0 z-0'
        src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt="" />
      </div>
      
      <div className='h-2/5 p-6'>
      <CaptainDetails/>
      </div>

        <div ref={ridePopUpPanelRef}  className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <RidePopUp 
       ride={ride}
       setRidePopUpPanel={setRidePopUpPanel} 
       setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
       confirmRide={confirmRide}/>
      </div>
      
        <div ref={confirmRidePopUpPanelRef}  className='fixed z-10 bottom-0 h-[90%] translate-y-full bg-white overflow-y-auto w-full px-3 py-6 pt-12'>
       <ConfirmRidePopUp 
       ride={ride}
       setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
       setRidePopUpPanel={setRidePopUpPanel}/>
      </div>

    </div>
    </div>
  )
}

export default CaptainHome;
