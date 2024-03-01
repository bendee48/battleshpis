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
  
  // testing drag drop
  // Object.values(playerBoard.cells).forEach(cell => {
  //   cell.addEventListener('dragover', handleDragOver);
  //   cell.addEventListener('dragenter', handleDragEnter);
  //   cell.addEventListener('dragleave', handleDragLeave);
  //   cell.addEventListener('drop', handleDrop);
  // })

  // const destroyer = document.getElementById('destroyer-draggable');
  // const carrier = document.getElementById('carrier-draggable');
  // destroyer.addEventListener('dragstart', handleDragStart);
  // destroyer.addEventListener('dragend', handleDragEnd);
  // carrier.addEventListener('dragstart', handleDragStart);

  // // Use global to hold dragged data, was running into issues reusing dataTransfer.getData() multiple times
  // let draggedData;
  
  // function handleDrop(event) {
  //   event.preventDefault();
  //   // remove valid borders
  //   event.target.classList.remove('valid-place');
  //   event.target.classList.remove('invalid-place');
  //   const ship = new Ship(draggedData.name, draggedData.length);
  //   const coord = event.target.dataset.coordinate;
  //   playerBoard.placeShip(coord, ship);
  // }

  // function handleDragStart(event) {
  //   event.dataTransfer.effectAllowed = 'move';
  //   draggedData = {
  //     name: event.target.dataset.name,
  //     length: Number(event.target.dataset.length)
  //   }
  // }

  // function handleDragEnter(event) {
  //   event.preventDefault();
  //   const tempShip = new Ship(draggedData.name, draggedData.length);
  //   const coord = event.target.dataset.coordinate;
  //   if (playerBoard.validPlacement(coord, tempShip)) {
  //     event.target.classList.add('valid-place');
  //   } else {
  //     event.target.classList.add('invalid-place')
  //   }
  // }

  // function handleDragOver(event) {
  //   event.preventDefault();
  // }

  // function handleDragLeave(event) {
  //   event.preventDefault();
  //   event.target.classList.remove('valid-place');
  //   event.target.classList.remove('invalid-place');
  // }

  // function handleDragEnd(event) {
  //   event.preventDefault();
  //   console.log(event.target.classList.add('clear'))
  // }

})();

export default game;