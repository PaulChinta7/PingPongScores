import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [token,setToken]=useState("");
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
            const response=await fetch(`http://localhost:8080/new/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(loginData)
            });
            if(!response.ok){
                throw new Error("NOT GOOD")
            }

            const token=await response.text();
            console.log(token);
            setToken(token);
            navigate("/");

        }
        catch(error){
            console.error("Some error");

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