import DOMBuilder from "./domBuilder";
import Ship from './ship';

const DOMController = (() => {
  const boardsContainer = document.querySelector('.boards-container');
  const draggablesContainer = document.querySelector('.draggables-container');

  const displayBoard = (gameboard) => {
    boardsContainer.appendChild(gameboard.board);
  }

  const displayDraggables = () => {
    for (let [name, length] of Ship.shipInfo()) {
      const draggable = DOMBuilder.buildDraggable(name, length);
      draggablesContainer.appendChild(draggable)
    }
  }

  return { displayBoard, displayDraggables }
})();

export default DOMController;