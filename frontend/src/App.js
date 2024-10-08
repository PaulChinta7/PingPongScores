import Login from './components/Login';
import Game from './components/Game';
// import Friends from './components/Friends';
import Home from './components/Home';
import './App.css';
import {Route, Routes, useLocation } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import LiveGame from './components/LiveGame';
// import Search from './components/Search';
// import Notification from './components/Notification';
import NavBar from './components/NavBar';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const location=useLocation();
  const noNavBarPaths = ['/', '/register','/forgot'];
  
  return (
    <>
 

    {!noNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/live" element={<LiveGame />} />
        {/* <Route path="/myfriends" element={<Friends />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="/notifications" element={<Notification />} /> */}
        <Route path="/logout" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
