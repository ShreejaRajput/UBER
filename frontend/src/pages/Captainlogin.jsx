import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance'; // ← use your shared instance
import { CaptainDataContext } from '../context/CaptainContext';

const Captainlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = { email, password };

    try {
      const response = await api.post('/captains/login', captainData);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.response?.data?.message || 'Check your credentials.'}`);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-30 mt-3 mb-5' src="/uber-captain.png" alt="Uber Captain" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input id="email"
          autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            placeholder='email@example.com'
          />
          <input id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />
          <button
            type="submit"
            className='bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg'
          >
            Login
          </button>
          <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center mb-5 text-white font-semibold rounded px-4 py-2 w-full text-lg'
        >
          Sign-in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;