import DOMBuilder from "./domBuilder";
import Ship from './ship';
import eventObserver from "./eventObserver";

/**
 * Module for displaying HTML elements of the DOM.
 *
 * @returns {Object} The public API with the displayBoard, displayDraggables, activateAIBoard,
   *                 activeBoard, inertBoard, displayGameOver, clearPage, removeGameOver and
   *                 highlightSunkShip functions.
 */
const DOMController = (() => {
  // container for the game boards
  const boardsContainer = document.querySelector('.boards-container');
  // container for the draggable elements
  const draggablesContainer = document.querySelector('.draggables-container');
  // page container
  const pageContainer = document.querySelector('.page-container');
  // message container
  const messageContainer = document.querySelector('.message-container');

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

  /**
   * Displays the game over screen.
   *
   * @param {String} text - A string to be displayed.
   * @returns {undefined}
   */
  const displayGameOver = (text) => {
    const endScreen = DOMBuilder.buildStandardElement('div', 'end-screen');
    const menu = DOMBuilder.buildMenu(text);
    endScreen.appendChild(menu);
    pageContainer.appendChild(endScreen);
  }

  /**
   * Removes the game over screen.
   *
   * @returns {undefined}
   */
  const removeGameOver = () => {
    const element = document.querySelector('.end-screen');
    element.remove();
  }

  /**
   * Clears the HTML page of all elements.
   *
   * @returns {undefined}
   */
  const clearPage = () => {
    boardsContainer.innerHTML = '';
    draggablesContainer.innerHTML = '';
  }

  /**
   * Highlights an entire sunken ship.
   * @param {Array<HTMLElement>} - The HTML elements representing the cells the ship occupies
   * @returns {undefined}
   */
  const highlightSunkShip = (cells) => {
    // highlight the first and last element seperately
    const [first, last] = [cells[0], cells.at(-1)];
    first.classList.add('highlight-first');
    last.classList.add('highlight-last');

    cells.forEach(cell => {
      cell.classList.add('highlight');
    })
  }

  // TODO messages
  const displayMessage = (text) => {
    const msg = DOMBuilder.buildStandardElement('div', 'msg');
    msg.textContent = text;
    console.log(boardsContainer, draggablesContainer);
    messageContainer.appendChild(msg);
    // triggers reflow so that initial values are set (for transition)
    msg.offsetWidth;
    msg.classList.add('appear');
    removeMessage(msg)
  }

  const removeMessage = (msg) => {
    setTimeout(() => {
      msg.classList.add('disappear');
      setTimeout(() => msg.remove(), 2000);
    }, 2000);
  }

  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the displayBoard, displayDraggables, activateAIBoard,
   *                   activeBoard, inertBoard, displayGameOver, clearPage, removeGameOver and 
   *                   highlightSunkShip functions.
   */
  return { 
           displayBoard, 
           displayDraggables,
           activateAIBoard,
           activeBoard, 
           inertBoard,
           displayGameOver,
           clearPage,
           removeGameOver,
           highlightSunkShip,
           displayMessage
         }
})();

export default DOMController;