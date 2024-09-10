import React from 'react'
import Logo from '../logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
     <div className="logo-container">
      <img className="logo" src={Logo} alt="logo" />
      
    </div>
    <p className='fs-3 p-2 text-center'>Score Tracker for live Table tennis</p>
    <div className="container">
    <ul className="list-group">
  <li className="list-group-item">Go to Search in the Navigation bar to search for friends!</li>
  <li className="list-group-item">Add friend and wait for them to accept!</li>
  <li className="list-group-item"> Accepted friends will be shown in <Link to="/game" className='text-dark'>Game</Link> Page in friends list.</li>
  <li className="list-group-item">Select a friend who is available , Select gamePoint and start the game.</li>
  <li className="list-group-item">Increment points according to the gameplay! No cheating!!!</li>
  <li className="list-group-item">Once game is completed you can go back to your <Link to="/profile" className='text-dark'>Profile</Link> page to view your stats.</li>
</ul>
    </div>
    <div className="special-center-parent m-4">

<Link to="/game" className='text-dark'>Lets go!!</Link>
</div>
      
    </>
  )
}

export default Home