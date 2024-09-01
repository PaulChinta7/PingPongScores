import React from 'react'

const Match = (props) => {

  const game=props.game;
  
  return (
    <>
    <span>{game.id}</span> <br />
    <span>08/30/2024 | 8:03pm</span> <br />
    <span>GamePoint {game.gamePoint}</span> <br />
     <span>{game.player1} vs {game.player2}</span> <br />
     <span>{game.player1Score} - {game.player2Score}</span> <br />
     <span>Status: {game.status}</span>
      </>
  )
}

export default Match