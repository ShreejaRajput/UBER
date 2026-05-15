import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmedRide from '../Components/ConfirmedRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';




const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
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

  


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '80%', duration: 0.4, ease: 'power2.out' ,padding:30});
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


  return (
    <div className=' h-screen relative overflow-hidden'>

      <img
        className='h-full w-full object-cover absolute top-0 left-0 z-0'
        src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt=""
      />

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
            <div className="line absolute h-16 w-1 top-[45%] left-7 bg-black"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-6 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Add a pickup location'
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-6 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Enter your destination'
            />
          </form>

          {panelOpen && (
            <h5
              onClick={() => setPanelOpen(false)}
              className='absolute top-4 right-5 text-2xl cursor-pointer'
            >
              ↓
            </h5>
          )}
        </div>
        <LocationSearchPanel  setPanelOpen={setPanelOpen}  setvehiclePanel={setvehiclePanel}/>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <VehiclePanel  setConfirmedRidePanel={setConfirmedRidePanel} setvehiclePanel={setvehiclePanel}/>
      </div>

      <div ref={confirmedRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicalFound={setVehicalFound} setvehiclePanel={setvehiclePanel}/>
      </div>

       <div ref={vehicalFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <LookingForDriver setVehicalFound={setVehicalFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0  bg-white w-full px-3 py-6 pt-12'>
       <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>


    </div>
  );
};

export default Home;