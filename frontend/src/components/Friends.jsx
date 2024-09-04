import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
const Friends = () => {
  // const [searchTerm,setSearchTerm]=useState('');
  const apiUrl=process.env.REACT_APP_API_URL;
  const [friends,setFriends]=useState([]);
  const id=sessionStorage.getItem('id');
  const token=sessionStorage.getItem('token');
  const handleFriends= async ()=>{
    try{
      const response= await fetch(`${apiUrl}/player/getFriendsById?id=`+id,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
        }
    })
    const data=await response.json();
    setFriends(data);
  
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    handleFriends();
  })
  return (

    // add friends search through email
    // list all friends
    <>
    {/* <p>search</p>
    <input type="text" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm} placeholder='Type email to search'/> */}


    <p>My friends</p>
    <ListGroup >
    {friends.map((friend)=>(    <ListGroup.Item key={friend.id} className='list-group-item'>{friend.name}</ListGroup.Item> ))}
     
    </ListGroup>
    
    </>
  )
}

export default Friends