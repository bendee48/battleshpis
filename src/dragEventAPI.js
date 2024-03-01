import Ship from './ship';

/**
 * Module for drag and drop functionality.
 *
 * @returns {Object} The public API with the setup method.
 */
const dragEventAPI = (() => {
  // use global to hold dragged data (was running into issues reusing dataTransfer.getData() multiple times)
  let draggedData;
  // hold the player board provided 
  let gameBoard;
  // hold the draggable elements from DOM
  let destroyerDraggable;
  let carrierDraggable;
  let battleshipDraggable;
  let patrolDraggable;
  let submarineDraggable;

  /**
   * Setups the module for use.
   * 
   * @param {object} playerBoard - A Gameboard object.
   */
  const setup = (playerBoard) => {
    gameBoard = playerBoard;
    _grabDraggables();
    _addDragEvents();
  };

  /**
   * Select draggable elements in the DOM
   * 
   * @private
   * @returns {undefined}
   */
  const _grabDraggables = () => {
    destroyerDraggable = document.getElementById('destroyer-draggable');
    carrierDraggable = document.getElementById('carrier-draggable');
    battleshipDraggable = document.getElementById('battleship-draggable');
    patrolDraggable = document.getElementById('patrol-draggable');
    submarineDraggable = document.getElementById('submarine-draggable');
  }

  /**
   * Add drag events to HTML elements
   * 
   * @private
   * @returns {undefined}
   */
  const _addDragEvents = () => {
    // add drag events to board cells
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
    submarineDraggable.addEventListener('dragstart', _handleDragStart);
    submarineDraggable.addEventListener('dragend', _handleDragEnd);
    patrolDraggable.addEventListener('dragstart', _handleDragStart);
    patrolDraggable.addEventListener('dragend', _handleDragEnd);
    battleshipDraggable.addEventListener('dragstart', _handleDragStart);
    battleshipDraggable.addEventListener('dragend', _handleDragEnd);
  }
  
  /**
   * Saves the name and length info from the draggable element into global
   * 
   * @private
   * @param {DragEvent} event - The dragstart event.
   * @returns {undefined}
   */
  const _handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    draggedData = {
      name: event.target.dataset.name,
      length: Number(event.target.dataset.length)
    }
  }

  /**
   * Creates ship and places it on the board, removes border classes
   * 
   * @private
   * @param {DragEvent} event - The drop event.
   * @returns {undefined}
   */
  const _handleDrop = (event) => {
    event.preventDefault();
    // remove valid border indicators
    event.target.classList.remove('valid-place');
    event.target.classList.remove('invalid-place');
    // create and place ship
    const ship = new Ship(draggedData.name, draggedData.length);
    const coord = event.target.dataset.coordinate;
    gameBoard.placeShip(coord, ship);
  }

  /**
   * Highlights cells on the game board based on their validity or invalidity for ship placement
   * 
   * @private
   * @param {DragEvent} event - The dragenter event.
   * @returns {undefined}
   */
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

  /**
   * Allows drag event to occur
   * 
   * @private
   * @param {DragEvent} event - The dragover event.
   * @returns {undefined}
   */
  const _handleDragOver = (event) => {
    event.preventDefault();
  }

  /**
   * Removes validity indicator classes from cell after a drag leave event
   * 
   * @private
   * @param {DragEvent} event - The dragleave event.
   * @returns {undefined}
   */
  const _handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove('valid-place');
    event.target.classList.remove('invalid-place');
  }

  /**
   * Clears the draggable element after ship is succesfully placed on the board
   * 
   * @private
   * @param {DragEvent} event - The dragend event.
   * @returns {undefined}
   */
  const _handleDragEnd = (event) => {
    event.preventDefault();
    if (event.dataTransfer.dropEffect === 'move' &&
        gameBoard.ships[draggedData.name]) {
          event.target.classList.add('clear');
        }
  }

  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the setup method.
   */
  return { setup };
})();

export default dragEventAPI;