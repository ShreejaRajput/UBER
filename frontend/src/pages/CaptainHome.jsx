import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'

const CaptainHome = () => {

const[ridePopUpPanel,setRidePopUpPanel]=useState(true);
const ridePopUpPanelRef=useRef(null)
const[confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);
const confirmRidePopUpPanelRef=useRef(null)

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
       <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      
        <div ref={confirmRidePopUpPanelRef}  className='fixed z-10 bottom-0 h-[90%] translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>

    </div>
    </div>
  )
}

export default CaptainHome
