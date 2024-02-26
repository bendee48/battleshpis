import Player from './player';
import Gameboard from './gameboard';
import DOMController from './domController';
import Ship from './ship';

// Main game loop
const game = (() => {
  const humanPlayer = new Player('human');
  const aiPlayer = new Player('ai');
  let currentPlayer = 'human';

  const playerBoard = new Gameboard('player-board');
  const aiBoard = new Gameboard('ai-board');

  DOMController.displayBoard(playerBoard);
  DOMController.displayBoard(aiBoard);

  // Adding event listener to ai cells

  Array.from(aiBoard.board.childNodes).forEach(cell => {
    cell.addEventListener('click', (e) => {
      handlePlayerTurn(e);
    })
  })

  // Placing player ships
  // const carrier = new Ship('carrier', 5);
  // const battleship = new Ship('battleship', 4);
  // const destroyer = new Ship('destroyer', 3);
  // const submarine = new Ship('submarine', 3);
  // const patrol = new Ship('patrol', 2);

  // playerBoard.placeShip('A3', carrier);
  // playerBoard.placeShip('F3', battleship);
  // playerBoard.placeShip('D5', destroyer);
  // playerBoard.placeShip('H10', submarine);
  // playerBoard.placeShip('G9', patrol);

  playerBoard.placeShipsRandomly();

  // Placing computer ships
  // const carrierAI = new Ship('carrier', 5);
  // const battleshipAI = new Ship('battleship', 4);
  // const destroyerAI = new Ship('destroyer', 3);
  // const submarineAI = new Ship('submarine', 3);
  // const patrolAI = new Ship('patrol', 2);

  // aiBoard.placeShip('A2', carrierAI);
  // aiBoard.placeShip('C3', battleshipAI);
  // aiBoard.placeShip('D5', destroyerAI);
  // aiBoard.placeShip('B7', submarineAI);
  // aiBoard.placeShip('G9', patrolAI);

  aiBoard.placeShipsRandomly();

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
})();

export default game;