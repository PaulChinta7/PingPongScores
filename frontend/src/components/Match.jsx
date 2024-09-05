import React from 'react'

const Match = (props) => {

  const game=props.game;
  
  return (
    <>
    <div className='container border defaultWidth'>
      <div className="row bg-dark text-white">
        <div className="col Match_id_container">
          

        <div className='Match_id'>{game.id}</div> 
    <div className='Match_date'>08/30/2024</div>
    <div className='Match_time'>8:03pm</div> 
         
        </div>
        <div className="col d-flex align-items-center justify-content-center">
         
     <span className='Match_status'>{game.status}</span>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
<span className='Match_player'>{game.player1}</span>
        </div>
        <div className="col text-center">vs</div>
        <div className="col text-center">
          <span  className='Match_player'>{game.player2}</span>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <span>{game.player1Score}</span>
        </div>
        <div className="col text-center">
        <span className='Match_gamePoint'>{game.gamePoint}</span> 
        </div>
        <div className="col text-center">
          <span> {game.player2Score}</span>
        </div>
      </div>
   
    </div>
      </>
  )
}

export default Match