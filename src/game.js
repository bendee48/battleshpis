import Player from './player';
import Gameboard from './gameboard';
import DOMController from './domController';
import dragEventAPI from './dragEventAPI';
import eventObserver from './eventObserver';


/**
 * Module for running the game.
 * 
 * @module game
 * @returns {Object} The public API with the run()function.
 */
const game = (() => {
  let humanPlayer; // Player instance
  let aiPlayer; // Player instance
  let currentPlayer; // Gameboard instance
  let playerBoard; // Gameboard instance
  let aiBoard; // Gameboard instance

  /**
   * Runs the game.
   * 
   */
  const run = () => {
    _setup();
  }


  /** Private **/

  /**
   * Sets up the game.
   * @private
   */
  const _setup = () => {
    _assignGlobals();
    _displayPageElements();
    _eventSubscriptions();
    _placeAIShips();
    _activateDragEvents();
  }

  /**
   * Assigns to the global variables.
   * @private
   */
  const _assignGlobals = () => {
    humanPlayer = new Player('human');
    aiPlayer = new Player('ai');
    currentPlayer = 'human';
    playerBoard = new Gameboard('player-board');
    aiBoard = new Gameboard('ai-board');
  }

  /**
   * Displays the essential HTML page elements.
   * @private
   */
  const _displayPageElements = () => {
    DOMController.displayBoard(playerBoard);
    DOMController.displayBoard(aiBoard);
    DOMController.displayDraggables();
  }

  /**
   * Signs up functions to events.
   * @private
   */
  const _eventSubscriptions = () => {
    // Subscribe the AI board to be activated when the game is ready
    eventObserver.subscribe('game ready', DOMController.activateAIBoard, aiBoard, _handlePlayerTurn)
    // Subscribe the AI board for active/ inactive display
    eventObserver.subscribe('board active', DOMController.activeBoard);
    eventObserver.subscribe('board inert', DOMController.inertBoard);
  }

  /**
   * PLaces ships on the AI board.
   * @private
   */
  const _placeAIShips = () => {
    aiBoard.placeShipsRandomly();
  }

  /**
   * Activates drag events.
   * @private
   */
  const _activateDragEvents = () => {
    dragEventAPI.setup(playerBoard);
  }

  /**
   * Handles the player's turn if event triggered.
   * @private
   * @param {Object} - Event object.
   */
  const _handlePlayerTurn = (event) => {
    if (event && currentPlayer === 'human') {
      const coord = humanPlayer.convertPlayerMove(event);
      const hit = aiBoard.receiveAttack(coord);
      _checkWin(aiBoard);
      // if move is a miss, switch to AI's turn
      if (!hit) {
        currentPlayer = 'ai';
        _handleAITurn();
      }
    }
  }

  /**
   * Handles the AI's turn.
   * @private
   * @returns {undefined}
   */
  const _handleAITurn = () => {
    eventObserver.run('board inert', aiBoard.board);
    // use timeout to give the player more noticeable feedback of the AI move
    setTimeout(()=> {
      if (currentPlayer === 'ai') {
        const coord = aiPlayer.getMove();
        const hit = playerBoard.receiveAttack(coord);
        // return after a win
        if (_checkWin(playerBoard)) return;
        // if move is a miss, switch to player and return 
        if (!hit) {
          currentPlayer = 'human';
          eventObserver.run('board active', aiBoard.board)
          return;
        }
        // or give AI another go if move is a hit
        _handleAITurn();
      }
    }, 1500);
  }

  /**
   * Checks if game has been won.
   * @private
   * @param {Object} - Gameboard instance.
   * @returns {undefined|Boolean} - Returns true if game has been won, else undefined
   */
  const _checkWin = (board) => {
    if (board.name === 'ai-board' && board.allSunk()) {
      const text = 'Player won!';
      DOMController.displayGameOver(text);
      _handleGameOver();
      return true;
    } else if (board.name === 'player-board' && board.allSunk()){
      const text = 'Computer won!'
      DOMController.displayGameOver(text);
      _handleGameOver();
      return true;
    }
  }

  /**
   * Adds event to game over screen button.
   * @private
   */
  const _handleGameOver = () => {
    const btn = document.querySelector('.menu-btn');
    btn.addEventListener('click', _restartGame);
  }

  /**
   * Restarts a new game.
   * @private
   */
  const _restartGame = () => {
    // clear HTML elements on page
    DOMController.removeGameOver();
    DOMController.clearPage()
    // reassign globals and display new page elements
    _assignGlobals();
    _displayPageElements();
    // subscribe new aiBoard to 'game ready' event
    eventObserver.unsubscribe('game ready', DOMController.activateAIBoard)
    eventObserver.subscribe('game ready', DOMController.activateAIBoard, aiBoard, _handlePlayerTurn)
    _placeAIShips();
    _activateDragEvents();
  }

  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the run()function.
   */
  return { run }

})();

export default game;