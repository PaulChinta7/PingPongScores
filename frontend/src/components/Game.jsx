import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const apiUrl=process.env.REACT_APP_API_URL;
  const userId=sessionStorage.getItem('id');
  
  const token=sessionStorage.getItem('token');
  const [player2Id,setPlayer2Id]=useState("");
  const [gamePoint,setGamePoint]=useState("");
  const [player2Name,setPlayer2Name]=useState("");

  const [player2NameError,setPlayer2NameError]=useState(false);
  const [gamePointError,setGamePointError]=useState(false);

  const [isLoading,setIsLoading]=useState(false);

  const navigate=useNavigate();

const handleFriend=(friendId,friendName)=>{
  // console.log(friendId);
  setPlayer2Id(friendId);
  setPlayer2Name(friendName);
  setPlayer2NameError(false);
}
const handleGamePoint=(e)=>{
  setGamePoint(e.target.value);
  setGamePointError(false);
}
  const handleCreateGame= async ()=>{
    if(player2Id===""){
      setPlayer2NameError(true);
    }
    else if(gamePoint===''){
      setGamePointError(true);
    }
    else{ 
      try{
        // console.log(userId,player2Id,gamePoint);
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
        // console.log(gameid);
        navigate("/live");
        
        if(!response.ok){
          throw new Error("Error");
        }
  
        
  
      }
      catch(error){
        console.log(error);
      }
    }

  }


  const [friends,setFriends]=useState([]);
  const id=sessionStorage.getItem('id');
 
  useEffect(()=>{
    setIsLoading(true);
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
      // console.log(data);
     
      // console.log(data);
      setFriends(data);
      setIsLoading(false);
    
      }
      catch(error){
        navigate("/");
        console.log(error);
      }
    }
    handleFriends();
  },[])
  

  return (<>  {isLoading? <div className='Profile_loadingStyle'><div className="spinner-border m-5 p-4 "   role="status"></div> 

    </div>:
  <div className="container py-5">
   <div className="row">
   <div className="col-lg-6">
    <div className='PlayGame_div'>
    <h4>Play Game</h4>
    <div className='Game_playerDiv'> <span className='Game_playerSubtitle'>Player:</span> <span className='Game_player'> {player2Name ? player2Name.toUpperCase() :<>Select a Friend to play</>}</span></div>
    {player2NameError && (
        <div className="Login_error-message">Did not select any player!</div>
      )}
    <select onChange={handleGamePoint}>
    <option value="" >Select Gamepoint</option>
      <option value="5">5</option>
      <option value="11">11</option>
      <option value="15">15</option>
      <option value="21">21</option>
    </select> <br />
    {gamePointError && (
        <div className="Login_error-message">Did not select any Gamepoint!</div>
      )}
    <button onClick={handleCreateGame} className='btn btn-dark'>Request Game</button>
    </div>
    </div>
    <div className="col-lg-6">
      


      <h4>My friends</h4>
{friends.length===0? <p className='Game_noMatch'>No friends yet. Search for friends to play!</p> :
      <table className="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Won</th>
      <th scope="col">Lost</th>
      <th scope="col" className='Game_winPercentage'>Win %</th>
      <th scope="col">Last 5</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {friends.map((friend)=>(<tr key={friend.id}>
      <th scope="row">{friend.name.toUpperCase()}</th>
      <td>{friend.gamesWon}</td>
      <td>{friend.gamesLost}</td>
      <td  className='Game_winPercentage'>{(friend.gamesWon+friend.gamesLost)===0?0:((friend.gamesWon/(friend.gamesWon+friend.gamesLost))*100).toFixed(2)}</td>
      <td> <div className='Game_last5Div'> { friend.last5.map((item,index)=> item===1?<div key={index} className="Game_gameBubbleGreen">W</div>:item===-1?<div key={index} className="Game_gameBubbleGray">N</div>:<div key={index} className="Game_gameBubbleRed">L</div>)} </div></td>
      <td>  <button className='btn btn-dark btn12' onClick={()=>handleFriend(friend.id,friend.name)}>Select</button></td>
    </tr>  ))}
    
   
  </tbody>
</table>}

   

   
    </div>
   </div>

  </div>

  }

  

  </>
  )
}

export default Game