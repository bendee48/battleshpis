const DOMBuilder = (() => {
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

  const _appendCells = (element, name, length) => {
    for (let i = 0; i < length; i++) {
      element.appendChild(_buildDraggableCell(name));
    }
  }

  const _buildDraggableCell = (name) => {
    const element = document.createElement('div');
    element.classList.add('cell', name);

    return element;
  }

  return { buildDraggable };
})();

export default DOMBuilder;