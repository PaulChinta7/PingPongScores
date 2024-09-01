
import React, { useEffect, useState } from 'react'
import Match from './Match'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [playerData,setPlayerData]=useState({"name":"","email":"","gamesWon":0,"gamesLost":0,"games":[]});
  const id=sessionStorage.getItem('id');
  const apiUrl=process.env.REACT_APP_API_URL;
  const token=sessionStorage.getItem('token');
  const navigate=useNavigate();
  const fetchPlayerData=async ()=>{
    try{
      const response=await fetch(`${apiUrl}/player/getPlayerById?id=`+id,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      // add token epxiration exception/login expired.
      if(!response.ok){
        console.log("Network Issue");
      }
      if(response.status===401){
        console.log("token Expired");
        navigate("/");
      }

      const data=await response.json();
      setPlayerData(data);
      

    }
    catch(error){
      console.error("Error has occured",error);
    }
  }
  useEffect(()=>{
    fetchPlayerData();
  },[])

  return (
    <>
    Account details  <br />
    <span>{playerData.name}</span><br />
    <span>{playerData.email}</span><br />
    <span>Won</span><span>{playerData.gamesWon}</span>
    <span>Lost</span><span>{playerData.gamesLost}</span><br />
    <span>Win % </span><span>{playerData.gamesWon}</span>
    
    <br />
    <div>History</div>

    {playerData.games.map(game=>(<Match key={game.id} game={game}/>))}
    
    </>
  )
}

export default Profile