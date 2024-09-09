import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [usernameError,setUsernameError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);
    const apiUrl=process.env.REACT_APP_API_URL;
    sessionStorage.setItem('token','');
    sessionStorage.setItem('id','');
    sessionStorage.setItem('gameId','');
    const navigate=useNavigate();
    const handleUsernameChange=(e)=>{setUsername(e.target.value); setUsernameError(false)};
    const handlePasswordChange=(e)=>{setPassword(e.target.value);setPasswordError(false)};
    const handleLogin = ()=>{
        fetchToken();
        
      
      }

      const fetchToken=async ()=>{
        try{

            const loginData={ "email":username,
                "password":password};
            const response=await fetch(`${apiUrl}/new/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(loginData)
            });
            if (response.ok) { 
                const token = await response.json();
                
                if(token.status===207){
                    sessionStorage.setItem('token', token.token);
                    sessionStorage.setItem('id',token.id);
                    navigate("/home");
                }
                if(token.status===404){
                    // console.log("A username not found");
                    setUsernameError(true);
                }
            } 
            else if(response.status===401){
                // console.log("Wrong password");
                setPasswordError(true);
            }
             else {
                console.log("An unexpected error occurred.");
            } 

        }
        catch(error){
            console.log(error.status);
            console.log("Some error");

        }
      }




  return (
    <>
    <Container className='defaultWidth'>

    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username"   onChange={handleUsernameChange}/>
        {usernameError && (
        <div className="Login_error-message">Your username is incorrect. Please try again.</div>
      )}
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={handlePasswordChange}/>
      </Form.Group>
      {passwordError && (
        <div className="Login_error-message">Your password is incorrect. Please try again.</div>
      )}
    
      <Button variant="primary"onClick={handleLogin}>
        Login
      </Button>
    </Form>
    <p><Link>Forgot password?</Link></p>
    <p><Link to="/register">New? Register to Log in!</Link></p>

    </Container>
    </>
  )
}

export default Login