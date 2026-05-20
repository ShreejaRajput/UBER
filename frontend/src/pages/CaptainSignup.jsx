import React from 'react'
import {Link} from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const CaptainSignup = () => {

  const navigate=useNavigate();



  const[email,setEmail]=React.useState('');
  const[password,setPassword]=React.useState('');
  const[firstName,setFirstName]=React.useState('');
  const[lastName,setLastName]=React.useState('');


  const [vehicleColor, setVehicleColor] = React.useState('');
  const [vehiclePlate, setVehiclePlate] = React.useState('');
  const [vehicleCapacity, setVehicleCapacity] = React.useState('');
  const [vehicleType, setVehicleType] = React.useState('');

  const {captain,setCaptain}=React.useContext(CaptainDataContext)

  const submitHandler=async(e)=>{
    e.preventDefault();
 const captainData= {
      fullname:{
        firstname:firstName,
        lastname:lastName,
      },
      email:email,
      password:password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    }

    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData);
if(response.status===201){
  const data=response.data
  setCaptain(data.captain);
  localStorage.setItem('token',data.token);
  navigate('/captain-home')
}

    console.log(captainData);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleCapacity('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleType('');
  }

  return (
    <div className='py-5 px-3 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-30 mb-5' src="/uber-captain.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}
        action="">
                    <h3 className='text-base font-medium mb-2'>What's your Name?</h3>

                    <div className='flex gap-4 mb-5'>
                      <input
                      required
                      className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-base'
                      type="text" 
                      placeholder='Firstname'
                      value={firstName}
                      onChange={(e)=>{
                        setFirstName(e.target.value);
                      }}/>

                      <input 
                      type="text"
                       required
                      className='bg-[#eeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-base' 
                      placeholder='Lastname' 
                      value={lastName}
                      onChange={(e)=>{
                        setLastName(e.target.value);
                      }}/>
                    </div>

          <h3 className='text-base font-medium mb-2'>What's your email?</h3>

          <input 
          required
          className='bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type='email'
          placeholder='email@example.com' 
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input 
          required
          value={password}
          className='bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="password" 
          placeholder='password'
          onChange={(e)=>{
            setPassword(e.target.value);
          }}/>

          <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e)=>{
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e)=>{
                setVehiclePlate(e.target.value);
              }}
            />
          </div>

          <div className='flex gap-4 mb-5'>
            <input
              required
              className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e)=>{
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base'
              value={vehicleType}
              onChange={(e)=>{
                setVehicleType(e.target.value);
              }}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg placeholder:text-base'>
           Register
          </button>
          <p className='text-center-align'>Already a User?<Link to='/captain-login' className='text-blue-600 mb-3'>Create Captain Account </Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTHA and the <span className='underline'>Google Privacy policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
