
import React, { useEffect, useState } from 'react'
import Match from './Match'
import { useNavigate } from 'react-router-dom';
// import Friends from './Friends';

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

      if(response.status===404){
        const data=await response.json();
        console.log(data);
        // setPlayerData(data);
      }
      else{
        const data=await response.json();
        // console.log(data);
        setPlayerData(data);
      }
      

    }
    catch(error){
      console.error("Error has occured",error);
    }
  }
  useEffect(()=>{
    fetchPlayerData();
  })

  return (
    <>
    <div className='container py-5'>
        <div className="row">
          
            <div className="col p-0">
              <div>Account details  </div>
              <div>
                <span>Username</span>
                <span className='text-secondary'>{playerData.name}</span>
                <span className='p-0'>Email</span>
                <span  className='text-secondary'>{playerData.email}</span>
                <div className='d-flex'>
                <span className='p-0'>Won {playerData.gamesWon}</span> &ensp;
                <span className='p-0'>Lost {playerData.gamesLost}</span>
                </div>
              </div>
              
            </div>
            <div className="col">
            <div>History</div>
            {playerData.games.map(game=>(<Match key={game.id} game={game}/>))}
            </div>
        </div>
    </div>
   
    
    
    </>
  )
}

export default Profile