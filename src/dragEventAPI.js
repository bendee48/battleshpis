import Ship from './ship';

const dragEventAPI = (() => {
  // use global to hold dragged data (was running into issues reusing dataTransfer.getData() multiple times)
  let draggedData;
  // hold the player board provided 
  let gameBoard;
  // hold the draggable elements from DOM
  let destroyerDraggable;
  let carrierDraggable;

  const setup = (playerBoard) => {
    gameBoard = playerBoard;
    _grabDraggables();
    _addDragEvents();
  };

  const _grabDraggables = () => {
    destroyerDraggable = document.getElementById('destroyer-draggable');
    carrierDraggable = document.getElementById('carrier-draggable');
  }

  const _addDragEvents = () => {
    // Add drag events to board cells
    Object.values(gameBoard.cells).forEach(cell => {
      cell.addEventListener('dragover', _handleDragOver);
      cell.addEventListener('dragenter', _handleDragEnter);
      cell.addEventListener('dragleave', _handleDragLeave);
      cell.addEventListener('drop', _handleDrop);
    });
    // add drag events to draggables
    destroyerDraggable.addEventListener('dragstart', _handleDragStart);
    destroyerDraggable.addEventListener('dragend', _handleDragEnd);
    carrierDraggable.addEventListener('dragstart', _handleDragStart);
    carrierDraggable.addEventListener('dragend', _handleDragEnd);
  }
  
  const _handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    draggedData = {
      name: event.target.dataset.name,
      length: Number(event.target.dataset.length)
    }
  }

  const _handleDrop = (event) => {
    event.preventDefault();
    // remove valid border indicators
    event.target.classList.remove('valid-place');
    event.target.classList.remove('invalid-place');
    const ship = new Ship(draggedData.name, draggedData.length);
    const coord = event.target.dataset.coordinate;
    gameBoard.placeShip(coord, ship);
  }

  const _handleDragEnter = (event) => {
    event.preventDefault();
    // create temp ship to check placement validity
    const tempShip = new Ship(draggedData.name, draggedData.length);
    const coord = event.target.dataset.coordinate;
    if (gameBoard.validPlacement(coord, tempShip)) {
      event.target.classList.add('valid-place');
    } else {
      event.target.classList.add('invalid-place');
    }
  }

  const _handleDragOver = (event) => {
    event.preventDefault();
  }

  const _handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove('valid-place');
    event.target.classList.remove('invalid-place');
  }

  const _handleDragEnd = (event) => {
    event.preventDefault();
    if (event.dataTransfer.dropEffect === 'move' &&
        gameBoard.ships[draggedData.name]) {
          event.target.classList.add('clear');
        }
  }

  return { setup };
})();

export default dragEventAPI;