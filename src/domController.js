import DOMBuilder from "./domBuilder";
import Ship from './ship';
import eventObserver from "./eventObserver";

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
  // page container
  const pageContainer = document.querySelector('.page-container');

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
   * Adds event listeners to the AI board.
   *
   * @param {object} gameboard - A Gameboard instance.
   * @param {Function} handler - The function to handle the event.
   * @returns {undefined}
   */
  const activateAIBoard = (gameboard, handler) => {
    Array.from(gameboard.board.childNodes).forEach(cell => {
      cell.addEventListener('click', (e) => {
        handler(e);
      })
    })
    // run the board active event
    eventObserver.run('board active', gameboard.board);
  }

  /**
   * Adds a class to a HTML element representing a board.
   *
   * @param {HTMLElement} board - The element holding the game board.
   * @returns {undefined}
   */
  const activeBoard = (board) => {
    board.classList.add('active-board');
  }

  /**
   * Removes a class from a HTML element representing a board.
   *
   * @param {HTMLElement} board - The element holding the game board.
   * @returns {undefined}
   */
  const inertBoard = (board) => {
    board.classList.remove('active-board');
  }

  // TODO document
  const displayGameOver = (text) => {
    const endScreen = DOMBuilder.buildStandardElement('end-screen');
    const menu = DOMBuilder.buildMenu(text);
    endScreen.appendChild(menu);
    pageContainer.appendChild(endScreen);
  }

  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the displayBoard, displayDraggables functions.
   */
  return { displayBoard, displayDraggables, activateAIBoard, activeBoard, inertBoard, displayGameOver }
})();

export default DOMController;