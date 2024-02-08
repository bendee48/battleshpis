class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.cells = this.#createCellDict();
  }

  /**
   * Creates a game board DOM element with a 10x10 grid, made up of individual cells.
   *
   * @returns {HTMLElement} The generated game board element.
   */
  createBoard() {
    const board = document.createElement('div');
    board.classList.add('board');

    for (let i = 1; i < 11; i++) {
      for (let j = 0; j < 10; j++) {
        const coord = this.#createCoordinate(i, j);
        board.appendChild(this.#createCell(coord));
      }
    }

    return board;
  }

  /**
   * Places a ship on the board from the provided coordinate.
   * 
   * @param {string} coord - Coordinate to place head of ship.
   * @param {object} ship - A Ship object.
   */
  placeShip(coord, ship) {
    // Fill cells to the ships length
    for (let i = 0; i < ship.length; i++) {
      // Mark cell as taken
      this.cells[coord].classList.add(ship.name, 'taken');
      // Create coord for the next letter (horizontal movement)
      let [letter, num] = coord.split('');
      coord = String.fromCharCode(letter.charCodeAt() + 1) + num;
    }
  }

  // receiveAttack() {
  //   return 1;
  // }

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