import React, { useEffect, useState } from 'react'

const Friends = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const apiUrl=process.env.REACT_APP_API_URL;
  const [friends,setFriends]=useState([]);
  const id=sessionStorage.getItem('id');
  const token=sessionStorage.getItem('token');
  const handleFriends= async ()=>{
    try{
      const response= await fetch(`${apiUrl}/player/getPlayerById?id=`+id,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
        }
    })
    const data=await response.json();
    setFriends(data.friends);
  
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
    <p>search</p>
    <input type="text" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm} placeholder='Type email to search'/>


    <p>My friends</p>
    {friends.map((friend,index)=>( <li key={index}>{friend}</li> ))}
    
    </>
  )
}

export default Friends