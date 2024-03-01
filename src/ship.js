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
   */
  constructor(name, length) {
    this._name = name;
    this._length = length;
    this._hits = 0;
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
}

export default Ship;