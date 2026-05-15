import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-full absolute top-0' onClick={()=>{
        props.setvehiclePanel(false);
       }}> <i className="text-3xl text-gray-200 fa-solid fa-angle-down"></i></h5>
        <h3 className='text-xl font-semibol mb-3'>Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmedRidePanel(true);
            }} className='flex border-2 active:border-black  rounded-xl  mb-2 w-full p-3 items-center  justify-between'>
              <img className='h-14' src="https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png" alt="" />
            <div className='flex-1 text-center  -ml-2' >
              <h4 className='font-medium text-base'>UberGo <span><i className="fa-solid fa-user"></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>
            </div>
              <h2 className='text-lg font-semibold'>193.20</h2>
            </div>

             <div onClick={()=>{
                props.setConfirmedRidePanel(true);
            }} className='flex border-2 active:border-black rounded-xl  mb-2 w-full p-3 items-center  justify-between'>
              <img className='h-16' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
            <div className='flex-1 text-center -ml-2' >
              <h4 className='font-medium text-base'>Uber Auto <span><i className="fa-solid fa-user"></i>3</span></h4>
              <h5 className='font-medium text-sm'>1 min away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>
            </div>
              <h2 className='text-lg font-semibold'>178.20</h2>
            </div>

             <div onClick={()=>{
                props.setConfirmedRidePanel(true);
            }} className='flex border-2 active:border-black rounded-xl  mb-2 w-full p-3 items-center  justify-between'>
              <img className='h-13' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
            <div className='flex-1 text-center  -ml-2' >
              <h4 className='font-medium text-base'>Moto <span><i className="fa-solid fa-user"></i>1</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable,Motocycle ride</p>
            </div>
              <h2 className='text-lg font-semibold'>65</h2>
            </div>
    </div>
  )
}

export default VehiclePanel
