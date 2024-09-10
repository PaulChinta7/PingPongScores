import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LiveGame = () => {

    const gameId=sessionStorage.getItem('gameId');
    const token=sessionStorage.getItem('token');
    const [msg,setMsg]=useState('');
    const apiUrl=process.env.REACT_APP_API_URL
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);
    const [buttonIsLoading,setButtonIsLoading]=useState(false);
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
                setIsLoading(false);
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
                // console.log("incremented"+playerId);
                setButtonIsLoading(false);
            }

        }
        catch(error){
            console.log(error);
        }
    }

    const handlePlayer1Score=()=>{
      setButtonIsLoading(true);
        // setLiveGame(prev=>({...prev,player1Score:prev.player1Score+1}));
        incrementPoint(liveGame.player1Id);
        

        
    }

    const handlePlayer2Score=()=>{
      setButtonIsLoading(true);
        // setLiveGame(prev=>({...prev,player2Score:prev.player2Score+1}));
        incrementPoint(liveGame.player2Id);
        // setButtonIsLoading(false);

        
    }
    useEffect(()=>{
        fetchLiveGame();
        
    });

  return (
<>
{isLoading? <div className='Profile_loadingStyle'><div className="spinner-border m-5 p-4 "   role="status"></div> 

</div>: 
<div className='container LiveGame_div'>
  <p>Live game</p>
   

    <div className="row">
      <div className="col d-flex justify-content-center align-items-center">
<span className='LiveGame_player1Name'>{liveGame.player1}</span>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
<span className='LiveGame_vs'>Vs</span>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
        <span className='LiveGame_player2Name'>{liveGame.player2}</span>
      </div>
    </div>
  
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">

    <span className='LiveGame_player1Score'>{liveGame.player1Score}</span>
        </div>
        <div className="col d-flex justify-content-center align-items-center">
    <span className='LiveGame_gamePoint r'>{liveGame.gamePoint}</span>

        </div>
        <div className="col d-flex justify-content-center align-items-center">
    <span className='LiveGame_player2Score'>{liveGame.player2Score} </span>

        </div>
      
    </div>
    <p className='LiveGame_status'>{liveGame.status}</p>
    {buttonIsLoading? <button className="btn btn-dark" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Wait!
      </button>  :
    <button className='btn btn-dark' onClick={handlePlayer1Score}>+1 {liveGame.player1}</button>} <br />

{buttonIsLoading? <button className="btn btn-dark" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Wait!
      </button>  :<button className='btn btn-dark' onClick={handlePlayer2Score}>+1 {liveGame.player2}</button>}

    <br />
    <button  className='btn btn-dark' onClick={()=>{navigate("/game")}}>End match</button>

</div>}
</>

  )
}

export default LiveGame