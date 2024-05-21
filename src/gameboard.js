import Ship from './ship';
import eventObserver from './eventObserver';
import DOMController from './domController';

/**
 * Represents a game board.
 *
 * @param {string} name - Name of the game board
 */
class Gameboard {
  /**
   * @constructor
   * @type {object} board - HTML element of gameboard and cells
   * @type {object} cells - Dictionary of cell coordinates and their corresponding HTML element
   *                        ie {'A1': <div class="cell"></div>}
   * @type {object} ships - Dictionary of ship name and its corresponding Ship object
   *                        ie {'battleship': {name: 'battleship', length: 4}}}
   * @type {Array<string>} misses - List of coordinates, attacked, that missed eg ['A1','D6']
   */
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
   * @return {boolean} - Returns true if ship is placed, false otherwise
   */
  placeShip(coord, ship) {
    // check validity of ship placement
    if (!this.validPlacement(coord, ship)) {
      return false;
    }
    // Fill cells to the ships length
    for (let i = 0; i < ship.length; i++) {
      // Mark cell as taken & add class name
      this.cells[coord].classList.add(ship.name, 'taken');
      // records cell to the ship
      ship.addCell(this.cells[coord]);
      // Add ships name to cell
      this.cells[coord].dataset.shipName = ship.name;
      // Create coord for the next letter (horizontal movement)
      let [letter, num] = this.#splitCoordinate(coord);
      coord = String.fromCharCode(letter.charCodeAt() + 1) + num;
    }
    // Keep track of ships placed on board
    this.ships[ship.name] = ship;
    // trigger the game ready event if player board is ready 
    if (this.#playerBoardReady()) {
      eventObserver.run('game ready');
    }
    return true;
  }

  /**
   * Places all the ships randomly on the board.
   * 
   * @returns {undefined}
   */
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
      if (this.validPlacement(coord, ships[i])) {
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
   * @return {boolean} - Returns true if attack is a hit, false otherwise
   */
  receiveAttack(coord) {
    const divElement = this.cells[coord];

    // check if a ship occupies the coordinate
    if (divElement.className.includes('taken')) {
      const shipName = divElement.dataset.shipName;
      const ship = this.ships[shipName];
      // record hit on ship
      ship.hit();
      // add .hit class to cell
      this.cells[coord].classList.add('hit');
      // if attack sinks ship, highlight it's cells
      if (ship.isSunk()) {
        DOMController.highlightSunkShip(ship.cells);
        const msg = `${ship.name} has been sunk!`
        DOMController.displayMessage(msg);
      }
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
   * @return {Array<string>} An array of the boards cell coordinates.
   */
  cellCoordinates() {
    return Object.keys(this.cells);
  }

  /**
   * Checks if a ship can be placed from the given coordinate
   * 
   * @param {string} coord - The starting coordinate for placing the ship (e.g., "A1").
   * @param {object} ship - The Ship object containing information about the ship.
   * @returns {boolean} - True if the placement is valid, false otherwise.
   */
  validPlacement(coord, ship) {
    return this.#enoughSpace(coord, ship) && 
           this.#freeCells(coord, ship)   &&
           this.#firstShip(ship);
  }


  /** Private Functions **/

  /**
   * Creates a game board DOM element with a 10x10 grid, made up of individual cells.
   * @private
   * @returns {HTMLElement} The generated game board HTML element.
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
   * Checks if ship is the first of it's kind to be added to the list of ships.
   * 
   * @private
   * @param {object} ship - The Ship object containing information about the ship.
   * @returns {boolean} - True if ship isn't in the list of ships, false otherwise.
   */
  #firstShip(ship) {
    return !this.ships[ship.name];
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
   * @returns {HTMLElement} The generated cell HTML element.
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
   * @returns {Object} - A dictionary of coordinate keys mapped to their HTML element.
   *                     eg. {'A1': <div class="cell"><div/>}
   */
  #createCellDict() {
    return [...this.board.children].reduce((dict, cell) => {
      dict[cell.dataset.coordinate] = cell;
      return dict;
    }, {});
  }

  /**
   * Checks if all the player's ships have been placed.
   * 
   * @private
   * @returns {Boolean} - True if all player ships have been placed on board. false otherwise.
   */
  #playerBoardReady() {
    const noOfShipsPlaced = Object.keys(this.ships).length;
    const noOfAvailableShips = Ship.shipInfo().length;

    return noOfShipsPlaced >= noOfAvailableShips && this.name === 'player-board'
  }
}

export default Gameboard;