import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Captainlogin from './pages/Captainlogin'
import UserLogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserContextProvider from './context/userContext'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'


const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/home' element={
          <UserProtectedWrapper> <Home/></UserProtectedWrapper>
         } />



<Route path='/users/logout' element={<UserProtectedWrapper>
  <UserLogout />
</UserProtectedWrapper>}/>

<Route path='/captain-home' element={
  <CaptainProtectedWrapper>
    <CaptainHome />
  </CaptainProtectedWrapper>
}/>

      </Routes>
    </UserContextProvider>
  )
}

export default App
