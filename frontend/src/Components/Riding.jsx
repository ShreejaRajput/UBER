import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useEffect,useContext} from 'react'
import {SocketContext} from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking'


const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride || null;
const {socket}=useContext(SocketContext);
const navigate=useNavigate();

useEffect(() => {
  if (!socket) return;
  const onEnded = (data) => {
    console.log('Ride ended:', data);
    navigate('/home');
  };
  socket.on('ride-ended', onEnded);
  return () => socket.off('ride-ended', onEnded);
}, [socket]);

  return (
    <div className='h-screen'>

<Link to='/home' className='fixed top-5 left-5 z-50 h-10 w-10 bg-black flex items-center justify-center rounded-full'>
 <i className="ri-home-3-line"></i>
</Link>


      <div className='relative h-1/2'>
        <LiveTracking ride={ride} />
      </div>
      
      <div className='h-1/2 p-4'>
              <div className='flex items-center justify-between '>
                {/* <img className='h-12 ' src="https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png" alt="" />*/}
                {/* <LiveTracking/> */}
              <div className='text-right'> 
                <h2 className='text-lg font-medium'>
                  {ride?.captain?.fullname?.firstname || 'Captain'}
                </h2>
                <h4 className='text-xl font-semibold -mt-2 -md-1'>
                  {ride?.captain?.vehicle?.plate || 'Vehicle'}
                </h4>
                <p className='text-sm text-gray-600'>
                  {ride?.captain?.vehicle?.type || 'Vehicle'}
                </p>

              </div>
        </div>



      <div className="flex gap-2 justify-between flex-col items-center">

        <div className="w-full mt-5">
        
          <div className="flex items-center gap-5  p-3 border-b-1">
            <i className="fa-solid fa-location-arrow"></i>

            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-small -mt-1 text-gray-600">
                {ride?.pickup || 'Pickup location'}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-5 ml-3">
            <i className="fa-solid fa-money-bill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare || 0}</h3>
              <p className="text-small -mt-1 text-gray-600">{ride?.destination || 'Destination'}</p>
            </div>
          </div>
        </div>
      </div>
        <button className='w-full bg-green-600 font-semibold p-2 text-white rounded-lg mt-5'>Make a payment</button>
      </div>
    </div>
  )
}

export default Riding
