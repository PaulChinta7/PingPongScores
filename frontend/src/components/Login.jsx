import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Logo from '../logo.png'
const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [usernameError,setUsernameError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);

    const [isLoading,setIsLoading]=useState(false);

    const apiUrl=process.env.REACT_APP_API_URL;
    sessionStorage.setItem('token','');
    sessionStorage.setItem('id','');
    sessionStorage.setItem('gameId','');
    const navigate=useNavigate();
    const handleUsernameChange=(e)=>{setUsername(e.target.value); setUsernameError(false)};
    const handlePasswordChange=(e)=>{setPassword(e.target.value);setPasswordError(false)};
    const handleLogin = ()=>{
      setIsLoading(true);
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
              setIsLoading(false);
                const token = await response.json();
                
                
                if(token.status===207){
                    sessionStorage.setItem('token', token.token);
                    sessionStorage.setItem('id',token.id);
                    navigate("/home");
                }
                if(token.status===404){
                    // console.log("A username not found");
                    setUsernameError(true);
                    setIsLoading(false);
                }
            } 
            else if(response.status===401){
                // console.log("Wrong password");
                setPasswordError(true);
                setIsLoading(false);
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
    <div className="logo-container">
      <img className="logo" src={Logo} alt="logo" />
    </div>
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
    
    <div className='special-center-parent'>

      {isLoading? <button className="btn btn-dark" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loggin in...
      </button>  :
       <Button variant="dark" onClick={handleLogin}>
       Login
     </Button>}
    </div>
      
      
    </Form>
    <div className="special-center-parent-column">
    <p className='py-1'><Link to="forgot" className='text-dark'>Forgot password?</Link></p> 
    <p><Link to="/register" className='text-dark'>New? Register to Log in!</Link></p>
    
    </div>
    </Container>
    </>
  )
}

export default Login