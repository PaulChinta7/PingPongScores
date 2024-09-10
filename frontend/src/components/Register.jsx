import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../logo.png';
const Register = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const [isLoading,setIsLoading]=useState(false);


    const navigate=useNavigate();
    const apiUrl=process.env.REACT_APP_API_URL
    const handleRegister=async()=>{
      setIsLoading(true);
      if(name==="" || email==="" || password==="" || confirmPassword===""){
        alert("Fill in all entries");
      }
      else{
        const payload={'name':name,'email':email,'password':password};
        try{
            const response=await fetch(`${apiUrl}/new/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(payload)
            })
            if(response.status===200){
                navigate('/');
            }
            if(response.status===208){
              console.log("Email already exist!");
              setIsLoading(false);
            }
        }
        catch(error){
            // console.log(error.response);
            console.log(error.status);
            setIsLoading(false);
        }
      }

    }
  return (<>
  <div className="logo-container">
      <img className="logo" src={Logo} alt="logo" />
    </div>
    <div className='container defaultWidthRegister py-3'>
    <p className='fs-2 text-center'>Register</p>
 <div className="row">

  <div className="col-lg-6">
    <label  className="form-label">Username</label>
    <div className="input-group has-validation">
      <span className="input-group-text" >@</span>
      <input type="text" className="form-control" onChange={(e)=>{setName(e.target.value)}} required/>
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div className="col-lg-6">
    <label className="form-label">Email</label>
    <input type="text" className="form-control" onChange={(e)=>{setEmail(e.target.value)}}  required/>
    <div className="valid-feedback">
      Looks good! 
    </div>
  </div>
  <div className="col-lg-6">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-lg-6">
    <label className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={(e)=>{setConfirmPassword(e.target.value)}} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="d-flex justify-content-center py-3">
  {isLoading? <button className="btn btn-dark" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Registering...
      </button>  :
    <button className="btn btn-dark" onClick={handleRegister}>Register</button>}
  </div>
  <div className="special-center-parent ">

    <Link to="/" className='text-dark'>Already have an account? Log in here</Link>
  </div>
 </div>


    </div>
    </>

  )
}

export default Register