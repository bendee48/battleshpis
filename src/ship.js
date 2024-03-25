/**
 * Represents a ship.
 *
 * @param {string} name - Name of the ship
 * @param {string} length - Length of the ship
 */
class Ship {
  /**
   * @constructor
   * @type {number} hits - The number of hits
   * @type {Array<HTMLElement>} cells - An array of the HTML elements representing the cells the ship occupies
   */
  constructor(name, length) {
    this._name = name;
    this._length = length;
    this._hits = 0;
    this._cells = [];
  }

  /**
   * Returns an array of information on the available ships
   *
   * @static
   * @return {Array<Array<string>|<number>>} - Information of the ships names and lengths
   *                                           eg [['ship', 3],['boaty', 5]]
   */
  static shipInfo() {
    return [
            ['carrier', 5],
            ['battleship', 4],
            ['destroyer', 3],
            ['submarine', 3],
            ['patrol', 2]
           ]
  }

  /**
   * Gets ship name.
   *
   * @return {string} - Name of the ship
   */
  get name() {
    return this._name;
  }

  /**
   * Gets length of ship.
   *
   * @return {string} - Length of the ship
   */
  get length() {
    return this._length;
  }

  /**
   * Gets the number of hits to the ship.
   *
   * @return {number} - No. of hits to the ship
   */
  get hits() {
    return this._hits;
  }

  /**
   * Gets a list of the cells the ship occupies on the board.
   *
   * @return {Array<HTMLElement>} - Array of the HTML elements that represent the ship 
   */
  get cells() {
    return this._cells;
  }

  /**
   * Registers a hit to the ship.
   *
   * @return {undefined}
   */
  hit() {
    this._hits++;
  }

  /**
   * Determines whether the ship has been sunk.
   *
   * @return {boolean} - True if the ship has been sunk, false otherwise
   */
  isSunk() {
    return this.hits >= this.length;
  }

  /**
   * Adds a cell to cells.
   *
   * @return {undefined}
   */
  addCell(cell) {
    this._cells.push(cell);
  }
}

export default Ship;