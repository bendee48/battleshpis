import Gameboard from './gameboard';

/**
  * Represents a player.
  * @constructor
  * @param {string} type - Signifies whether player is human or AI
**/
class Player {
  constructor(type) {
    this.type = type;
    this.availableMoves = this.#coordinates();
  }

  /**
   * Converts a player move event to a coordinate.
   * @param {Event} event - The event object representing the player move.
   * @returns {string} The coordinate extracted from the event.
   */
  convertPlayerMove(event) {
    return event.target.dataset.coordinate;
  }

  /**
   * Gets a move by generating a random index, then retrieving the corresponding coordinate
   * from the available moves, then removing the move from the available moves list.
   * @returns {string} The coordinate of the selected move.
   */
  getMove() {
    const index = this.#generateIndex();
    const coord = this.availableMoves[index];
    this.#deleteMove(coord);
    return coord;
  }

  /**
   * Deletes a move from the list of available moves based on its coordinate.
   * @private
   * @param {string} coord - The coordinate of the move to be deleted.
   */
  #deleteMove(coord) {
    const index = this.availableMoves.indexOf(coord);
    this.availableMoves.splice(index, 1);
  }

  /**
   * Generates a random index within the range of available moves. 
   * ie 0 - this.availableMoves.length
   * @private
   * @returns {number} A random index for selecting a move.
   */
  #generateIndex() {
    return Math.floor(Math.random() * this.availableMoves.length);
  }

  /**
   * Uses Gameboard to grab an array of coordinates representing all cells on the gameboard.
   * @private
   * @returns {string[]} An array of string coordinates.
   */
  #coordinates() {
    return Object.keys(new Gameboard().cells);
  }
}

export default Player;