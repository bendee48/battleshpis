/**
 * Module for building HTML elements for the DOM.
 *
 * @returns {Object} The public API with the buildDraggable, buildStandardElement, buildMenu functions.
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
    const element = buildStandardElement('div', 'draggable');
    element.setAttribute('id', `${name}-draggable`);
    element.draggable = true;
    element.dataset.name = name;
    element.dataset.length = length;
    _appendCells(element, name, length);

    return element;
  }

  /**
   * Builds a HTML element and adds any classes.
   *
   * @param {string} elementType - The name of the HTML element to create.
   * @param {...string} classes - The names of classes to add to the element.
   * @returns {HTMLElement} The created HTML element.
   */
  const buildStandardElement = (elementType, ...classes) => {
    const element = document.createElement(elementType);
    element.classList.add(...classes);

    return element;
  }

  /**
   * Builds the menu HTML element.
   *
   * @param {string} text - A string to be displayed.
   * @returns {HTMLElement} The created HTML element.
   */
  const buildMenu = (text) => {
    let menu = buildStandardElement('div', 'menu');
    let btn = buildStandardElement('button', 'menu-btn');
    let para = buildStandardElement('p', 'menu-text');
    btn.innerText = 'Play Again?';
    para.innerText = text;
    menu.append(para, btn);

    return menu;
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
    const element = buildStandardElement('div', 'cell', name)

    return element;
  }


  /**
   * Public API of the module.
   * 
   * @returns {Object} The public API with the buildDraggable, buildStandardElement & buildMenu functions.
   */
  return { buildDraggable, buildStandardElement, buildMenu };
})();

export default DOMBuilder;