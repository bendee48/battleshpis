/**
 * Module for building HTML elements for the DOM.
 *
 * @returns {Object} The public API with the buildDraggable function.
 */
const DOMBuilder = (() => {
  /**
   * Builds a draggable element with cells.
   *
   * @param {string} name - The name of the draggable element.
   * @param {number} length - The number of cells to be appended.
   * @returns {HTMLElement} The draggable element.
   * @example - const draggableElement = DOMBuilder.buildDraggable('example', 3);
   */
  const buildDraggable = (name, length) => {
    const element = document.createElement('div');
    element.setAttribute('id', `${name}-draggable`);
    element.classList.add('draggable');
    element.draggable = true;
    element.dataset.name = name;
    element.dataset.length = length;
    _appendCells(element, name, length);

    return element;
  }

  /**
   * Appends cells to the draggable element.
   *
   * @private
   * @param {HTMLElement} element - The draggable element.
   * @param {string} name - The name of the draggable element.
   * @param {number} length - The number of cells to be appended.
   */
  const _appendCells = (element, name, length) => {
    for (let i = 0; i < length; i++) {
      element.appendChild(_buildDraggableCell(name));
    }
  }

  /**
   * Builds a draggable cell element.
   *
   * @private
   * @param {string} name - The name of the draggable element.
   * @returns {HTMLElement} The draggable cell element.
   */
  const _buildDraggableCell = (name) => {
    const element = document.createElement('div');
    element.classList.add('cell', name);

    return element;
  }

  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the buildDraggable function.
   */
  return { buildDraggable };
})();

export default DOMBuilder;