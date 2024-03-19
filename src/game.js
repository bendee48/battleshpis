import Player from './player';
import Gameboard from './gameboard';
import DOMController from './domController';
import dragEventAPI from './dragEventAPI';
import eventObserver from './eventObserver';
import DOMBuilder from './domBuilder';

// Main game loop
const game = (() => {
  let humanPlayer = new Player('human');
  let aiPlayer = new Player('ai');
  let currentPlayer = 'human';

  let playerBoard = new Gameboard('player-board');
  let aiBoard = new Gameboard('ai-board');

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

  function handlePlayerTurn(event) {
    if (event && currentPlayer === 'human') {
      const coord = humanPlayer.convertPlayerMove(event);
      const hit = aiBoard.receiveAttack(coord);
      checkWin(aiBoard);
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
        // return after a win
        if (checkWin(playerBoard)) return;
        // switches to handlePlayerTurn() if no hit
        if (!hit) {
          currentPlayer = 'human';
          eventObserver.run('board active', aiBoard.board)
          return;
        }
        // or gives AI another go if a hit is a success
        handleAITurn();
      }
    }, 0);
  }

  function checkWin(board) {
    if (board.name === 'ai-board' && board.allSunk()) {
      const text = 'Player won!';
      DOMController.displayGameOver(text);
      handleGameOver();
      return true;
    } else if (board.name === 'player-board' && board.allSunk()){
      const text = 'Computer won!'
      DOMController.displayGameOver(text);
      handleGameOver();
      return true;
    }
  }

  function handleGameOver() {
    const btn = document.querySelector('.menu-btn');
    btn.addEventListener('click', restartGame);
  }

  function restartGame() {
    console.log('restarting')
    DOMController.removeGameOver();
    DOMController.clearPage()

    humanPlayer = new Player('human');
    aiPlayer = new Player('ai');
    currentPlayer = 'human';

    playerBoard = new Gameboard('player-board');
    aiBoard = new Gameboard('ai-board');

    DOMController.displayBoard(playerBoard);
    DOMController.displayBoard(aiBoard);
    DOMController.displayDraggables();
    
    eventObserver.unsubscribe('game ready', DOMController.activateAIBoard)
    eventObserver.subscribe('game ready', DOMController.activateAIBoard, aiBoard, handlePlayerTurn)
  
    aiBoard.placeShipsRandomly();
    dragEventAPI.setup(playerBoard);
    console.log(eventObserver)
  }


  // TESTTING
  // DOMController.displayGameOver('hello')

})();

export default game;