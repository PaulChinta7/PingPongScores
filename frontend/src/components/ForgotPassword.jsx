import React from 'react'
import Logo from '../logo.png'
import { Link } from 'react-router-dom'
const ForgotPassword = () => {
  return (<>
     <div className="logo-container">
      <img className="logo" src={Logo} alt="logo" />
    </div>
    <div className='container fs-6 text-center'>Will Implement in future!! <br /> Mail paulchinta7@gmail.com for password change!</div>
    <div className="special-center-parent ">

<Link to="/">Log in here</Link>
</div>
  </>
  )
}

export default ForgotPassword