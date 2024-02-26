import Ship from './ship';

/**
   * Represents a game board.
   *
   * @param {string} name - Name of the game board
   */
class Gameboard {
  constructor(name) {
    this.name = name;
    this.board = this.#createBoard();
    this.cells = this.#createCellDict();
    this.ships = {};
    this.misses = [];
  }

  /**
   * Places a ship on the board from the provided coordinate.
   * 
   * @param {string} coord - Coordinate to place head of ship.
   * @param {object} ship - A Ship object.
   */
  placeShip(coord, ship) {
    // check validity of ship placement
    if (!this.#validPlacement(coord, ship)) {
      return false;
    }
    
    // Fill cells to the ships length
    for (let i = 0; i < ship.length; i++) {
      // Mark cell as taken & add class name
      this.cells[coord].classList.add(ship.name, 'taken');
      // Add ships name to cell
      this.cells[coord].dataset.shipName = ship.name;
      // Create coord for the next letter (horizontal movement)
      let [letter, num] = this.#splitCoordinate(coord);
      coord = String.fromCharCode(letter.charCodeAt() + 1) + num;
    }

    // Keep track of ships placed on board
    this.ships[ship.name] = ship;
    return true;
  }

  placeShipsRandomly() {
    const carrierAI = new Ship('carrier', 5);
    const battleshipAI = new Ship('battleship', 4);
    const destroyerAI = new Ship('destroyer', 3);
    const submarineAI = new Ship('submarine', 3);
    const patrolAI = new Ship('patrol', 2);
    const ships = [carrierAI, battleshipAI, destroyerAI, submarineAI, patrolAI];
    
    // grab a random coordinate and place ship if it's valid, if not try again
    for (let i = 0; i < ships.length; i++) {
      let index = Math.floor(Math.random() * this.cellCoordinates().length);
      let coord = this.cellCoordinates()[index];
      if (this.#validPlacement(coord, ships[i])) {
        this.placeShip(coord, ships[i]);
      } else {
        i--;
      }
    }
  }

  /**
   * Handles an attack on the board.
   * 
   * @param {string} coord - Coordinate of attack.
   */
  receiveAttack(coord) {
    const divElement = this.cells[coord];

    // check if a ship occupies the coordinate
    if (divElement.className.includes('taken')) {
      let shipName = divElement.dataset.shipName;
      // record hit on ship
      this.ships[shipName].hit();
      // add .hit class to cell
      this.cells[coord].classList.add('hit');
      // return true to indicate a hit
      return true;
    } else {
      // track misses
      this.misses.push(coord);
      // add .miss class to cell
      this.cells[coord].classList.add('miss');
      // return false to indicate a miss
      return false;
    }
  }

  /**
   * Checks to see if all ships have been sunk.
   * 
   * @returns {Boolean} True if all ships are sunk, otherwise false
   */
  allSunk() {
    return Object.entries(this.ships).every(([_, ship]) => ship.isSunk());
  }

  /**
   * Returns a list of all the board coordinates.
   * 
   * @return {Array.<string>} An array of the boards cell coordinates.
   */
  cellCoordinates() {
    return Object.keys(this.cells);
  }

  /**
   * Creates a game board DOM element with a 10x10 grid, made up of individual cells.
   * @private
   * @returns {HTMLElement} The generated game board element.
   */
  #createBoard() {
    const board = document.createElement('div');
    board.classList.add(this.name, 'board');

    for (let i = 1; i < 11; i++) {
      for (let j = 0; j < 10; j++) {
        const coord = this.#createCoordinate(i, j);
        board.appendChild(this.#createCell(coord));
      }
    }

    return board;
  }

  /**
   * Checks if a ship can be placed from the given coordinate
   * 
   * @private
   * @param {string} coord - The starting coordinate for placing the ship (e.g., "A1").
   * @param {object} ship - The Ship object containing information about the ship.
   * @returns {boolean} - True if the placement is valid, false otherwise.
   */
  #validPlacement(coord, ship) {
    return this.#enoughSpace(coord, ship) && this.#freeCells(coord, ship);
  }

  /**
   * Checks if there are enough free cells from the given coordinate
   * for the ship to be placed (horizontally).
   * 
   * @private
   * @param {string} coord - The starting coordinate for placing the ship (e.g., "A1").
   * @param {object} ship - The Ship object containing information about the ship.
   * @returns {boolean} - True if there is enough space for placing the ship, false otherwise.
   */
  #enoughSpace(coord, ship) {
    const letters = 'ABCDEFGHIJ';
    const letter = coord[0];
    const index = letters.indexOf(letter);
    const spaceNeeded = index + ship.length;
    return spaceNeeded <= letters.length;
  }

  /**
   * Checks if each cell from the given coordinate is free for placing a ship.
   * 
   * @private
   * @param {string} coord - The starting coordinate for placing the ship (e.g., "A1").
   * @param {object} ship - The Ship object containing information about the ship.
   * @returns {boolean} - True if the cells are free for placing the ship, false otherwise.
   */
  #freeCells(coord, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (this.cells[coord].className.includes('taken')) return false;
      // Create coord for the next letter (horizontal movement)
      let [letter, num] = this.#splitCoordinate(coord);
      coord = String.fromCharCode(letter.charCodeAt() + 1) + num;
    }
    return true;
  }

  /**
   * Splits a coordinate into it's letter and number.
   * 
   * @private
   * @param {string} coord - A coordinate eg 'A1'.
   * @returns {Array} An array containing the letter and number.
   * @returns {string} 0 - The letter.
   * @returns {string} 1 - The number.
   */
  #splitCoordinate(coord) {
    const [_,letter, num] = coord.match(/([A-J])(\d+)/);
    return [letter, num];
  }

  /**
   * Creates a coordinate.
   * 
   * @private
   * @param {number} number - Numerical part of coordinate.
   * @param {number} letterNum - An index for a letter.
   * @returns {String} The generated coordinate eg 'J4'.
   */
  #createCoordinate(number, letterNum) {
    const letters = 'ABCDEFGHIJ';
    return letters[letterNum] + number;
  }

  /**
   * Creates an individual cell for the game board.
   * 
   * @private
   * @param {string} coord - The coordinate of the cell, e.g., 'A1'.
   * @returns {HTMLElement} The generated cell element.
   */
  #createCell(coord) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // Add data-set attribute eg. data-coordinate='A1'
    cell.dataset.coordinate = coord;

    return cell;
  }

  /**
   * Creates a dictionary for the gameboard cells.
   * 
   * @private
   * @returns {Object} A dictionary of coordinate keys mapped to their HTML element.
   */
  #createCellDict() {
    return [...this.board.children].reduce((dict, cell) => {
      dict[cell.dataset.coordinate] = cell;
      return dict;
    }, {});
  }
}

export default Gameboard;