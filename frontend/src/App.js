import Login from './components/Login';
import Game from './components/Game';
import Friends from './components/Friends';
import Home from './components/Home';
import './App.css';
import {Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import LiveGame from './components/LiveGame';
import Search from './components/Search';
import Notification from './components/Notification';
import NavBar from './components/NavBar';

function App() {
  const sess=sessionStorage.getItem('id');
  return (
    <>
    <Router>
      


      <NavBar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/live" element={<LiveGame />} />
        <Route path="/myfriends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
