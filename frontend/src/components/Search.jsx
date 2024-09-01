import React, { useEffect, useState } from 'react'

const Search = () => {
    const apiUrl=process.env.REACT_APP_API_URL;
    const token=sessionStorage.getItem('token');

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

    useEffect(()=>{
        fetchPlayers();
    });


  return (
    <>
    <p>Players</p>
    <input type="text" placeholder='search'/>
    <ul>
        {players.map(player=>( <li key={player.id}>{player.name} |  {player.email} | Games Won :{player.gamesWon} | Games Lost : {player.gamesLost} | <button>Add Friend</button></li> ))}
    </ul>
    
    </>
  )
}

export default Search