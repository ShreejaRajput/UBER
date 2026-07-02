import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center w-full absolute top-0"
        onClick={() => {
          props.waitingForDriver(false);
        }}>

        {" "}
        <i className="text-3xl text-gray-200 fa-solid fa-angle-down"></i>
      </h5>
     

        <div className='flex items-center justify-between '>
                <img className='h-12 ' src="https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png" alt="" />
              <div className='text-right'>
                <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname} </h2>
                <h4 className='text-xl font-semibold -mt-2 -md-1'>{props.ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
            

              </div>
        </div>

      <div className="flex gap-2 justify-between flex-col items-center">
      

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg fa-solid fa-location-crosshairs"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-small -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5  p-3 border-b-1">
            <i className="fa-solid fa-location-arrow"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-small -mt-1 text-gray-600">
               {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 ml-3">
            <i className="fa-solid fa-money-bill"></i>
            <div>
              <h3 className="text-lg font-medium"> ₹{props.ride?.fare}</h3>
              <p className="text-small -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
