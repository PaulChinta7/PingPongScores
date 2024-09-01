import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const apiUrl=process.env.REACT_APP_API_URL;
  const userId=sessionStorage.getItem('id');
  const token=sessionStorage.getItem('token');
  const [player2Id,setPlayer2Id]=useState("");
  const [gamePoint,setGamePoint]=useState("");
  const navigate=useNavigate();

const handleFriend=(e)=>{
  setPlayer2Id(e.target.value);
}
const handleGamePoint=(e)=>{
  setGamePoint(e.target.value);
}
  const handleCreateGame= async ()=>{
    try{
      console.log(userId,player2Id,gamePoint);
      const payload={"player1Id":userId,"player2Id":player2Id,"gamePoint":gamePoint};
      const response=await fetch(`${apiUrl}/game/createGame`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify(payload)
        
      })
      
      const gameid=await response.text();
      sessionStorage.setItem('gameId',gameid);
      console.log(gameid);
      navigate("/live");
      if(!response.ok){
        throw new Error("Error");
      }

      

    }
    catch(error){
      console.log(error);
    }

  }



  

  return (<>
    <div>Game</div>
    <div>Create Game</div>
    <select  onChange={handleFriend}>
    <option value="" disabled>Select a friend</option>
      <option value="66d1efbdf4793057dd92d158">Ramesh</option>
      <option value="66d3a494558cde4fa37b0e86">Ruu</option>
      <option value="66d35b799f81de4609eb766b">Parash</option>
      <option value="66d3a465558cde4fa37b0e85">Luu</option>
    </select>
    <select onChange={handleGamePoint}>
    <option value="" disabled>Select Gamepoint</option>
      <option value="5">5</option>
      <option value="11">11</option>
      <option value="15">15</option>
      <option value="21">21</option>
    </select>
    <button onClick={handleCreateGame}>Create game</button>

  

  </>
  )
}

export default Game