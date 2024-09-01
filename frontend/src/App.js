import Login from './components/Login';
import Game from './components/Game';
import Friends from './components/Friends';
import Home from './components/Home';
import './App.css';
import { Link, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import LiveGame from './components/LiveGame';

function App() {
  return (
    <>
    <Router>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/game">Create</Link></li>
          <li><Link to="/live">Game</Link></li>
          <li><Link to="/myfriends">Friends</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/live" element={<LiveGame />} />
        <Route path="/myfriends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
