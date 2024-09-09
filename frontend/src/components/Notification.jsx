import React, { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap';
import Game from './Game';

const Notification = () => {

  const apiUrl=process.env.REACT_APP_API_URL;
  const playerId=sessionStorage.getItem('id');
  const token=sessionStorage.getItem('token');
  const [requests,setRequests]=useState([]);


    
  // const getFromattedDate=(date)=>{
  //   const dateObj=new Date(date);
  //   // setDate((dateObj.getMonth()+1)+"/"+dateObj.getDate()+"/"+dateObj.getFullYear())
    
  //   if(dateObj.getHours()>12){
  //     return (dateObj.getHours()-12)+":"+dateObj.getMinutes()+"pm";
  //   }
  //   else{
  //     return (dateObj.getHours()-12)+":"+dateObj.getMinutes()+"am";
  //   }

  // } {()=>{getFromattedDate(request.requestDate)}}


  const fetchFriendRequests= async ()=>{
    try{
      const response= await fetch(`${apiUrl}/friendRequest/getRequests?acceptorId=`+playerId,{
          method:'POST',
          headers:{
              'Authorization':`Bearer ${token}`,
              'Content-Type':'application/json',
          }
      })

      const data=await response.json();
      setRequests(data);




  }
  catch(error){
      console.log(error);
  }
  }

  const handleAcceptFriend= async (requestId)=>{
    try{
      const response= await fetch(`${apiUrl}/friendRequest/acceptFriend?friendRequestId=`+requestId,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
        }
    })
    if(response.ok){
      console.log("Accepted");
    }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleRejectFriend= async (requestId)=>{
    try{
      const response= await fetch(`${apiUrl}/friendRequest/rejectFriend?friendRequestId=`+requestId,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
        }
    })
    if(response.ok){
      console.log("Accepted");
    }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchFriendRequests();
  },[]);

  return (
    <>
    
      <NavDropdown.Item className='Navbar_dropdown'>
      
    {requests.length===0?<p>No Notifications</p>:requests.map(request=>( <div key={request.id} className='Notification_notif'> <p className='Notification_requestMsg'> {request.requestorName} has requested to be your friend </p> <button className='btn btn-sm btn-dark btn12' onClick={()=>{handleAcceptFriend(request.id)}}>Accept</button> <button  className='btn btn-sm btn-dark btn12' onClick={()=>{handleRejectFriend(request.id)}}>Reject</button><NavDropdown.Divider /> </div> ))}
      </NavDropdown.Item>
    </>
  )
}

export default Notification