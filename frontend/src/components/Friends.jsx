import React, { useState } from 'react'

const Friends = () => {
  const [searchTerm,setSearchTerm]=useState('');


  return (

    // add friends search through email
    // list all friends
    <>
    <p>search</p>
    <input type="text" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm} placeholder='Type email to search'/>


    <p>My friends</p>
    
    </>
  )
}

export default Friends