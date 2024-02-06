class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.cells = { a1: {className: 'battleship'} };
  }

  placeShip(coord, ship) {

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
}

export default Gameboard;