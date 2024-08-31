import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const apiUrl=process.env.REACT_APP_API_URL;
    const navigate=useNavigate();
    const handleUsernameChange=(e)=>{setUsername(e.target.value)};
    const handlePasswordChange=(e)=>{setPassword(e.target.value)};
    const handleLogin = ()=>{
        fetchToken();
        
      
      }

      const fetchToken=async ()=>{
        try{

            const loginData={ "name":username,
                "password":password};
            const response=await fetch(`${apiUrl}/new/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(loginData)
            });
            if(response.status===401){
                console.log("Login credentials are wrong!!");
            }
            // based on status change handle the exception
            if(response.ok){

                const token=await response.text();
                sessionStorage.setItem('token',token);
                navigate("/home");
            }

        }
        catch(error){
            console.log(error.status);
            console.log("Some error");

        }
      }




  return (
    <div>
        <label htmlFor="">username</label>
        <input type="text" onChange={handleUsernameChange}/>
        <br />
        <label htmlFor="">password</label>
        <input type="password" onChange={handlePasswordChange}/>
        <button onClick={handleLogin}>login</button>

    </div>
  )
}

export default Login