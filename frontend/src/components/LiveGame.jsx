import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LiveGame = () => {

    const gameId=sessionStorage.getItem('gameId');
    const token=sessionStorage.getItem('token');
    const [msg,setMsg]=useState('');
    const apiUrl=process.env.REACT_APP_API_URL
    const navigate=useNavigate();
    const [liveGame,setLiveGame]=useState({"id":"","player1":"","player1Id":"","player1Score":0,"player2Id":"","player2Score":0,"player2":"","gamePoint":0,"status":""});
    const fetchLiveGame=async ()=>{
        

        try{
                const response=await fetch(`${apiUrl}/game/getGamesById?gameId=`+gameId,{
                  method:'POST',
                  headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`, 
                  }
                })
                const game=await response.json();
                setLiveGame(game);
              }
              catch(error){
                console.log(error);
              }
            
    }

    const incrementPoint=async(playerId)=>{
        try{
            const response=await fetch(`${apiUrl}/game/increment?id=`+gameId+`&playerId=`+playerId,{
                method:'POST',
                headers:{
                    'Conten-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                }
            })
            if(response.ok){
                console.log("incremented"+playerId);
            }

        }
        catch(error){
            console.log(error);
        }
    }

    const handlePlayer1Score=()=>{
        setLiveGame(prev=>({...prev,player1Score:prev.player1Score+1}));
        incrementPoint(liveGame.player1Id);

        
    }

    const handlePlayer2Score=()=>{
        setLiveGame(prev=>({...prev,player2Score:prev.player2Score+1}));
        incrementPoint(liveGame.player2Id);

        
    }
    useEffect(()=>{
        fetchLiveGame();
    },);

  return (
<>
{msg===''  ?(<div>
  <p>Live game</p>
    <p>{liveGame.player1} vs {liveGame.player2}</p>
    <p>{liveGame.player1Score} - <b>{liveGame.gamePoint}</b> -{liveGame.player2Score}</p>
    <p>Status: {liveGame.status}</p>
    <button onClick={handlePlayer1Score}>+1 {liveGame.player1}</button> <br />
    <button onClick={handlePlayer2Score}>+1 {liveGame.player2}</button>
    <br />
    <button onClick={()=>{navigate("/game")}}>End match</button>

</div>): msg}
</>

  )
}

export default LiveGame