import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const apiUrl=process.env.REACT_APP_API_URL;
    sessionStorage.setItem('token','');
    sessionStorage.setItem('id','');
    sessionStorage.setItem('gameId','');
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
            if (response.ok) { 
                const token = await response.json();
                
                if(token.status===207){
                    sessionStorage.setItem('token', token.token);
                    sessionStorage.setItem('id',token.id);
                    navigate("/home");
                }
                if(token.status===404){
                    console.log("A username not found");
                }
            } 
            else if(response.status===401){
                console.log("Wrong password");
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
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={handlePasswordChange}/>
      </Form.Group>
    
      <Button variant="primary"onClick={handleLogin}>
        Login
      </Button>
    </Form>
    </Container>
    </>
  )
}

export default Login