
import React, { useEffect, useState } from 'react'
import Match from './Match'
import { Link, useNavigate } from 'react-router-dom';


const Profile = () => {

  const [playerData,setPlayerData]=useState({"name":"","email":"","gamesWon":0,"gamesLost":0,"last10":[],"games":[]});
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
        // console.log(data.last10);
        setPlayerData(data);
      }
      

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
    <div className='container py-3'>
        
          
           <div className="profile_flexContainer">

              <div className='profile_accountDiv '>
                

                <h4 className='profile_title'>Account details  </h4>
                <span className='profile_label'>Username</span>
                <span className='profile_playerName'>{playerData.name.toUpperCase()}</span>
                <span  className='profile_label'>Email</span>
                <span  className='profile_email'>{playerData.email.toUpperCase()}</span>
            
                
               <div className="d-flex profile_stats">
                <span className='profile_gamesLost_label'>Won </span>
                <span className='profile_gamesWon '>{playerData.gamesWon}</span>
                <span className='profile_gamesLost_label'>Lost </span>
                <span className='profile_gamesLost'>{playerData.gamesLost}</span>
                <span className='profile_gamesLost_label'>Win rate</span>
                <span className='profile_gamesLost'>{(playerData.gamesWon+playerData.gamesLost)===0?0:((playerData.gamesWon/(playerData.gamesWon+playerData.gamesLost))*100).toFixed(2)}%</span>
               </div>
               <span className='profile_Last10_title'>Last 10 games</span>
                <div className='profile_Last10'> { playerData.last10.map((item,index)=> 
                item===1?<div key={index} className="Game_gameBubbleGreen">W</div>
                :item===-1?                <div key={index} className="Game_gameBubbleGray">N</div>
                :<div key={index} className="Game_gameBubbleRed">L</div>)} 
                </div>
           
        
              </div>
            <div className="profile_matches">
              
            <h4>History</h4>
            {playerData.games.length===0? <p className='Game_noMatch'>No matches Played yet. Click here to play game  <button className='btn btn-dark btn12'><Link to="/game" className='removeDecor text-light'>Play</Link></button>
              </p> :playerData.games.slice().reverse().map(game=>(<Match key={game.id} game={game} className="py-4"/>))}
             
            </div>
                </div>
            

            
           
              
           
    </div>
    
   
    
    
    </>
  )
}

export default Profile