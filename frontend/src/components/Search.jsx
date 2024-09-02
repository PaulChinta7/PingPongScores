import React, { useEffect, useState } from 'react'

const Search = () => {
    const apiUrl=process.env.REACT_APP_API_URL;
    const token=sessionStorage.getItem('token');
    const playerId=sessionStorage.getItem('id');

    const [players,setPlayers]=useState([]);



    const fetchPlayers= async ()=>{

        try{
            const response= await fetch(`${apiUrl}/player/getPlayers`,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json',
                }
            })

            const players=await response.json();

            if(response.ok){
                // console.log(players);
                setPlayers(players);

            }
            else{
                console.error("Something 4---?")
            }





        }
        catch(error){
            console.log(error);
        }

    }


    const handleAddFriend= async (acceptorId)=>{
        const payload={"acceptorId":acceptorId,"requestorId":playerId}
        try{

const response= await fetch(`${apiUrl}/friendRequest/addFriend`,{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(payload)
            })

            if(response.ok){
                console.log("Requested");
            }

        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchPlayers();
    });


  return (
    <>
    <p>Players</p>
    <input type="text" placeholder='search'/>
    <ul>
        {players.map(player=>( <li key={player.id}>{player.name} |  {player.email} | Games Won :{player.gamesWon} | Games Lost : {player.gamesLost} | <button onClick={()=>{handleAddFriend(player.id)}}>Add Friend</button></li> ))}
    </ul>
    
    </>
  )
}

export default Search