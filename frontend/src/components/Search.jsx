import React, { useEffect, useState } from 'react'

const Search = () => {
    const apiUrl=process.env.REACT_APP_API_URL;
    const token=sessionStorage.getItem('token');
    const playerId=sessionStorage.getItem('id');

    const [players,setPlayers]=useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    




    const fetchPlayers= async ()=>{

        try{
            const response= await fetch(`${apiUrl}/player/search?playerId=`+playerId+`&searchTerm=`+searchTerm,{
                method:'POST',
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
    const handleRefresh=()=>{
        console.log("Refresh");
    }

    useEffect(()=>{
        fetchPlayers();
    },[handleRefresh]);


  return (
    <>
    <div className="container Navbar_dropdown">
    { players.length===0?<p>No players found</p>:<>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Won</th>
      <th scope="col">Lost</th>
      <th scope="col"></th>   
    </tr>
  </thead>
  <tbody>
  {players.map(player=>(<tr key={player.id}>
      <th scope="row">{player.name}</th>
      <td>{player.email}</td>
      <td>{player.gamesWon}</td>
      <td>{player.gamesLost}</td>
      <td>  <button  className='btn btn-dark btn12 width80' onClick={()=>{handleAddFriend(player.id);handleRefresh()}} disabled={player.requested?true:false}>{player.requested?<>Requested</>:<>Add friend</>}</button></td>
    </tr>  ))}
    
   
  </tbody>
</table></>}
    </div>
    

    
    </>
  )
}

export default Search