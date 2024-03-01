import Player from './player';
import Gameboard from './gameboard';
import DOMController from './domController';
import dragEventAPI from './dragEventAPI';

// Main game loop
const game = (() => {
  const humanPlayer = new Player('human');
  const aiPlayer = new Player('ai');
  let currentPlayer = 'human';

  const playerBoard = new Gameboard('player-board');
  const aiBoard = new Gameboard('ai-board');

  DOMController.displayBoard(playerBoard);
  DOMController.displayBoard(aiBoard);

  dragEventAPI.setup(playerBoard);

  // Adding event listener to ai cells

  Array.from(aiBoard.board.childNodes).forEach(cell => {
    cell.addEventListener('click', (e) => {
      handlePlayerTurn(e);
    })
  })

  aiBoard.placeShipsRandomly();

  // nothing happens if placed after random, will crash if placed before in placeShipsRandomly()
  // const patrolAI = new Ship('patrol', 2);
  // aiBoard.placeShip('G9', patrolAI);

  function handlePlayerTurn(event) {
    if (event && currentPlayer === 'human') {
      const coord = humanPlayer.convertPlayerMove(event);
      const hit = aiBoard.receiveAttack(coord);
      // if a miss move to AI turn
      if (!hit) {
        currentPlayer = 'ai';
        handleAITurn();
      }
      console.log(aiBoard.allSunk(),'ai')
    }
  }

  function handleAITurn() {
    if (currentPlayer === 'ai') {
      const coord = aiPlayer.getMove();
      const hit = playerBoard.receiveAttack(coord);
      console.log(playerBoard.allSunk(), 'player')
      // switches to handlePlayerTurn() if no hit
      if (!hit) {
        currentPlayer = 'human';
        return;
      }
      // or gives AI another go if a hit is a success
      handleAITurn();
    }
  } 

  console.log([aiBoard])
})();

export default game;