import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import api from '../utils/axiosInstance';

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('🔥 submit fired', email, password);

    try {
      const response = await api.post('/users/login', { email, password });

      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.status, error.response?.data || error.message);
      alert(`Login failed: ${error.response?.data?.message || 'Unauthorized. Check credentials.'}`);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-5' src="Uber-logo.png" alt="" />
        {/* ✅ no action="" here */}
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            id="email"
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            id="password"
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

          <p className='text-center'>
            New Here? <Link to='/signup' className='text-blue-600 mb-3'>Create new Account</Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg'
        >
          Sign-in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;