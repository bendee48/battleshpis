import Player from './player';
import Gameboard from './gameboard';
import DOMController from './domController';
import dragEventAPI from './dragEventAPI';
import eventObserver from './eventObserver';

// Main game loop
const game = (() => {
  const humanPlayer = new Player('human');
  const aiPlayer = new Player('ai');
  let currentPlayer = 'human';

  const playerBoard = new Gameboard('player-board');
  const aiBoard = new Gameboard('ai-board');

  DOMController.displayBoard(playerBoard);
  DOMController.displayBoard(aiBoard);
  DOMController.displayDraggables();

  // EVENTS
  // Subscribe the AI board to be activated when the game is ready
  eventObserver.subscribe('game ready', DOMController.activateAIBoard, aiBoard, handlePlayerTurn)
  // Subscribe the AI board for active display
  eventObserver.subscribe('board active', DOMController.activeBoard);
  eventObserver.subscribe('board inert', DOMController.inertBoard);
  
  aiBoard.placeShipsRandomly();
  dragEventAPI.setup(playerBoard);

  // nothing happens if placed after random, will crash if placed before in placeShipsRandomly()
  // const patrolAI = new Ship('patrol', 2);
  // aiBoard.placeShip('G9', patrolAI);

  console.log(aiBoard)

  function handlePlayerTurn(event) {
    if (event && currentPlayer === 'human') {
      const coord = humanPlayer.convertPlayerMove(event);
      const hit = aiBoard.receiveAttack(coord);
      // if a miss move to AI turn
      if (!hit) {
        currentPlayer = 'ai';
        handleAITurn();
      }
    }
  }

  function handleAITurn() {
    eventObserver.run('board inert', aiBoard.board)
    setTimeout(()=> {
      if (currentPlayer === 'ai') {
        const coord = aiPlayer.getMove();
        const hit = playerBoard.receiveAttack(coord);
        // switches to handlePlayerTurn() if no hit
        if (!hit) {
          currentPlayer = 'human';
          eventObserver.run('board active', aiBoard.board)
          return;
        }
        // or gives AI another go if a hit is a success
        handleAITurn();
      }
    }, 1500);
  }

})();

export default game;