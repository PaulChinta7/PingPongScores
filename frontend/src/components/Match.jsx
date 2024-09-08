import React from 'react'

const Match = (props) => {

  const game=props.game;
  
  return (
    <>

      <div className="Match_unit">

      
      <div className="Match_id_container">
      {/* <span className='Match_id'>{game.id}</span>  */}
      <span className='Match_status'>{game.status}</span>
      <div className='Match_timestamp'>
      <span className='Match_date'>08/30/2024</span>
      <span className='Match_time'>8:03pm</span> 
      </div>
      </div>

      <div className="Match_border">

      <div className="row d-flex justify-content-center" >
      <span className='col Match_player1'>{game.player1.toUpperCase()}</span>
      <span className='col Match_playerVs'>vs</span>
      <span  className=' col Match_player2'>{game.player2.toUpperCase()}</span>
      </div>

      <div className="d-flex justify-content-center">
      <span className='Match_playerScore1'>{game.player1Score}</span>
      <span className='Match_gamePoint'>{game.gamePoint}</span> 
      <span className='Match_playerScore2'> {game.player2Score}</span>
      </div>
      </div>
   
      </div>
      </>
  )
}

export default Match