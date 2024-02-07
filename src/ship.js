class Ship {
  constructor(name, length) {
    this._name = name;
    this._length = length;
    this._hits = 0;
  }

  get name() {
    return this._name;
  }

  get length() {
    return this._length;
  }

  get hits() {
    return this._hits;
  }

  hit() {
    this._hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export default Ship;