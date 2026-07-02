import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmedRide from '../Components/ConfirmedRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';
import axios from 'axios';
import {SocketContext} from '../context/SocketContext';
import {useContext} from 'react';
import { useEffect } from 'react';
import {UserDataContext} from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../Components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const [vehiclePanel,setvehiclePanel]=useState(false);
  const vehiclePanelRef=useRef(null);
  const confirmedRidePanelRef=useRef(null);
  const vehicalFoundRef=useRef(null);
  const waitingForDriverRef=useRef(null);
  const PanelCloseRef=useRef(null);
  const[confirmedRidePanel,setConfirmedRidePanel]=useState(false);
  const [vehicalfound,setVehicalFound]=useState(false);
  const [waitingForDriver,setwaitingForDriver]=useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const{socket}=useContext(SocketContext);
  const{user}=useContext(UserDataContext);


useEffect(() => {    
    socket.emit("join", { userType: "user", userId: user._id });
}, [user]); 


socket.on('ride-confirmed', ride => {
  console.log(ride);
  setVehicalFound(false);  // ← hide the "Looking for Driver" panel
  setwaitingForDriver(true);
  setRide(ride);
})


socket.on('ride-started', ride => {
  setwaitingForDriver(false);
  navigate('/riding', { state: { ride } });

})


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '100%', duration: 0.4, ease: 'power2.out' ,padding:30});
    } else {
      gsap.to(panelRef.current, { height: '30%', duration: 0.4, ease: 'power2.out' });
    }
  }, [panelOpen]);



useGSAP(function(){
if(vehiclePanel){
gsap.to(vehiclePanelRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(vehiclePanelRef.current,{
  transform:'translateY(100%)'
})

}
},[vehiclePanel])


useGSAP(function(){
if(confirmedRidePanel){
gsap.to(confirmedRidePanelRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(confirmedRidePanelRef.current,{
  transform:'translateY(100%)'
})

}
},[confirmedRidePanel])


useGSAP(function(){
if(vehicalfound){
gsap.to(vehicalFoundRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(vehicalFoundRef.current,{
  transform:'translateY(100%)'
})

}
},[vehicalfound])


useGSAP(function(){
if(waitingForDriver){
gsap.to(waitingForDriverRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(waitingForDriverRef.current,{
  transform:'translateY(100%)'
})

}
},[waitingForDriver])


async function findTrip(){
  setvehiclePanel(true);
  setPanelOpen(false);
  setConfirmedRidePanel(false);  
  setVehicalFound(false);

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
    params: {
        pickup: pickup,
        dropoff: destination
    },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
  console.log(response.data)
   setFare(response.data.fare);
}
 
async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup: pickup,
        dropoff: destination,
        vehicleType: vehicleType  // ← uses state variable directly
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    console.log(response.data);
}

  return (
   
    <div className=' h-screen relative overflow-hidden'>

      {/* <img
        className='h-full w-full object-cover absolute top-0 left-0 z-0'
        src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt=""
      /> */}
      <LiveTracking/>

      <img
        className='w-16 absolute left-5 top-5 z-20'
        src="Uber-logo.png"
        alt=""
      />

      {/* Panel — height controlled by GSAP via style, NOT Tailwind */}
      <div
        ref={panelRef}
        style={{ height: '30%' }}
        className='bg-white absolute bottom-0 w-full z-10 rounded-t-3xl overflow-hidden'
      >
        <div className='p-5 relative'>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[35%] left-7 bg-black"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              onFocus={() => setActiveField('pickup')}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField('pickup');
              }}
              className='bg-[#eee] px-6 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Add a pickup location'
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              onFocus={() => setActiveField('destination')}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField('destination');
              }}
              className='bg-[#eee] px-6 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
              <button onClick={findTrip} className='bg-black text-white px-6 py-2 text-base rounded-lg w-full mt-5'>
                Find Trip
              </button>


          {panelOpen && (
            <h5
              onClick={() => setPanelOpen(true)}
              className='absolute top-4 right-5 text-2xl cursor-pointer'
            >
              ↓
            </h5>
          )}
        </div>
        <LocationSearchPanel
          activeField={activeField}
          inputValue={
            activeField === 'pickup'
              ? pickup
              : activeField === 'destination'
              ? destination
              : ''
          }
          onSelectSuggestion={(value) => {
            if (activeField === 'pickup') {
              setPickup(value);
            } else if (activeField === 'destination') {
              setDestination(value);
            }
            // setPanelOpen(false);
            // setvehiclePanel(true);
          }}
          setPanelOpen={setPanelOpen}
          setvehiclePanel={setvehiclePanel}
        />
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <VehiclePanel 
  setConfirmedRidePanel={setConfirmedRidePanel} 
  setvehiclePanel={setvehiclePanel}
  setVehicleType={setVehicleType}
  fare={fare}
/>
      </div>

      <div ref={confirmedRidePanelRef} className='absolute z-20 h-[90vh] bottom-0 translate-y-full bg-white overflow-y-auto w-full px-3 py-6 pt-12'>
       <ConfirmedRide 
       createRide={createRide} 
       pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setConfirmedRidePanel={setConfirmedRidePanel} 
        setVehicalFound={setVehicalFound} 
        setvehiclePanel={setvehiclePanel}/>
      </div>

<div ref={vehicalFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
  <LookingForDriver
    createRide={createRide} 
    pickup={pickup}
    destination={destination}
    fare={fare}
    vehicleType={vehicleType}
    setConfirmedRidePanel={setConfirmedRidePanel}
    setVehicalFound={setVehicalFound}
    setvehiclePanel={setvehiclePanel}
  />
</div>

      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <WaitingForDriver 
       ride={ride}
       setVehicalFound={setVehicalFound}
       setwaitingForDriver={setwaitingForDriver}
       waitingForDriver={waitingForDriver} />
      </div>


    </div>
  );
};

export default Home;