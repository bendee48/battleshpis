import DOMBuilder from "./domBuilder";
import Ship from './ship';

/**
 * Module for displaying HTML elements of the DOM.
 *
 * @returns {Object} The public API with the displayBoard, displayDraggables functions.
 */
const DOMController = (() => {
  // container for the game boards
  const boardsContainer = document.querySelector('.boards-container');
  // container for the draggable elements
  const draggablesContainer = document.querySelector('.draggables-container');

  /**
   * Displays a game board.
   *
   * @param {object} gameboard - A Gameboard instance.
   * @returns {undefined}
   */
  const displayBoard = (gameboard) => {
    boardsContainer.appendChild(gameboard.board);
  }

  /**
   * Displays the draggable ships.
   *
   * @returns {undefined}
   */
  const displayDraggables = () => {
    /**
     * Loop through ship information, create draggable elements.
     * and append to container
     * @param {string} name - The name of the ship.
     * @param {number} length - The length of the ship.
     */
    for (let [name, length] of Ship.shipInfo()) {
      const draggable = DOMBuilder.buildDraggable(name, length);
      draggablesContainer.appendChild(draggable)
    }
  }

  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the displayBoard, displayDraggables functions.
   */
  return { displayBoard, displayDraggables }
})();

export default DOMController;