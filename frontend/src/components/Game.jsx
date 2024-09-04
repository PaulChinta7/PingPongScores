import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LiveGame from './LiveGame';
import { ListGroup} from 'react-bootstrap';

const Game = () => {
  const apiUrl=process.env.REACT_APP_API_URL;
  const userId=sessionStorage.getItem('id');
  const [flag,setFlag]=useState(false);
  const token=sessionStorage.getItem('token');
  const [player2Id,setPlayer2Id]=useState("");
  const [gamePoint,setGamePoint]=useState("");
  const [player2Name,setPlayer2Name]=useState("");
  const navigate=useNavigate();

const handleFriend=(friendId,friendName)=>{
  // console.log(friendId);
  setPlayer2Id(friendId);
  setPlayer2Name(friendName);
}
const handleGamePoint=(e)=>{
  setGamePoint(e.target.value);
}
  const handleCreateGame= async ()=>{
    setFlag(true);  
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


  // const [searchTerm,setSearchTerm]=useState('');
  const [friends,setFriends]=useState([]);
  const id=sessionStorage.getItem('id');
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
  

  return (<>
  <div className="container py-5">
   <div className="row">
   <div className="col">
    {flag? <LiveGame/>: <>
    <div>Play Game</div>
    <h4>Player: <span>{player2Name ? player2Name : <bold>Select a Friend to play</bold> }</span></h4>
    <select onChange={handleGamePoint}>
    <option value="" disabled>Select Gamepoint</option>
      <option value="5">5</option>
      <option value="11">11</option>
      <option value="15">15</option>
      <option value="21">21</option>
    </select> <br />
    <button onClick={handleCreateGame} className='btn btn-dark'>Request Game</button>
    </>}
    </div>
    <div className="col">
      {/* <Friends/> */}


      <p>My friends</p>
    <ListGroup >
    {friends.map((friend)=>(    <ListGroup.Item key={friend.id} className='list-group-item'>{friend.name} <button className='btn btn-primary' onClick={()=>handleFriend(friend.id,friend.name)}>Select</button></ListGroup.Item> ))}
    </ListGroup>
    </div>
   </div>

  </div>

  

  </>
  )
}

export default Game