import React, { useEffect, useState } from 'react'

const Notification = () => {

  const apiUrl=process.env.REACT_APP_API_URL;
  const playerId=sessionStorage.getItem('id');
  const token=sessionStorage.getItem('token');
  const [requests,setRequests]=useState([]);

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

  useEffect(()=>{
    fetchFriendRequests();
  });

  return (
    <>
    <div>Requests</div>
    {requests.map(request=>( <div key={request.id}> <p> {request.requestorId}  </p> <button onClick={()=>{handleAcceptFriend(request.id)}}>Accept</button> <button>Reject</button> </div> ))}
    </>
  )
}

export default Notification