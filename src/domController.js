const DOMController = (() => {
  const boardsContainer = document.querySelector('.boards-container');

  const displayBoard = (gameboard) => {
    boardsContainer.appendChild(gameboard.board);
  }

  return { displayBoard }
})();

export default DOMController;