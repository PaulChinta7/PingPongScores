import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const navigate=useNavigate();
    const apiUrl=process.env.REACT_APP_API_URL
    const handleRegister=async()=>{
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
            if(response.status==200){
                navigate('/');
            }
            if(response.status==208){
              console.log("Email already exist!");
            }
        }
        catch(error){
            // console.log(error.response);
            console.log(error.status);
        }
      }

    }
  return (
    <div className='container defaultWidthRegister py-3'>
    <p>Register</p>
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
  <div className="d-flex justify-content-center py-2">

    <button className="btn btn-dark" onClick={handleRegister}>Register</button>
  </div>
    <Link to="/">Already have an account? Log in here</Link>
 </div>


    </div>

  )
}

export default Register