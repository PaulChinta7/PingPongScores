import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const navigate=useNavigate();
    const apiUrl=process.env.REACT_APP_API_URL
    const handleRegister=async()=>{
        const payload={'name':name,'email':email,'password':password};
        try{
            const response=await fetch(`${apiUrl}/new/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(payload)
            })
            if(response.ok){
                navigate('/');
            }
        }
        catch(error){
            console.log(error);
        }

    }
  return (
    <div className='container'>
    
 
  <div className="col-md-4">
    <label  className="form-label">Username</label>
    <div className="input-group has-validation">
      <span className="input-group-text" >@</span>
      <input type="text" className="form-control" onChange={(e)=>{setName(e.target.value)}} required/>
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div className="col-md-4">
    <label className="form-label">Email</label>
    <input type="text" className="form-control" onChange={(e)=>{setEmail(e.target.value)}}  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={(e)=>{setConfirmPassword(e.target.value)}} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>

  <div className="col-12">
    <button className="btn btn-primary" onClick={handleRegister}>Submit form</button>
  </div>
        
        {/* <p>username</p> <input type="text" onChange={(e)=>{setName(e.target.value)}} />
    <p>email</p><input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
    <p>passwords</p><input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
    <p>confirm password</p><input type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
    <br />
    <button onClick={handleRegister}>Sign up</button> */}
    </div>

  )
}

export default Register