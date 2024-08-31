import React from 'react'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile


// import React, { useState } from 'react'
// import Match from './Match'

// const Profile = () => {

//   const [playerData,setPlayerData]=useState(null);

//   const apiUrl=process.env.REACT_APP_API_URL;
//   const token=sessionStorage.getItem('token');
//   const fetchPlayerData=async ()=>{
//     try{
//       const response=await fetch(`${apiUrl}/player/getPlayerById?id=`+id,{
//         method:'POST',
//         headers:{
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         }
//       });
//       if(!response.ok){
//         console.log("Network Issue");
//       }
      

//     }
//     catch(error){
//       console.error("Error has occured",error);
//     }
//   }

//   return (
//     <>
//     Account details  <br />
//     <span>Paul</span><br />
//     <span>Paul@gmail.com</span><br />
//     <span>Won</span><span>10</span>
//     <span>Lost</span><span>7</span><br />
//     <span>Win % </span><span>120%</span>
    
//     <br />
//     <div>History</div>

//     <Match/>
    
//     </>
//   )
// }

// export default Profile