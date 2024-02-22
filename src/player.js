/**
  * Represents a player.
  * @constructor
  * @param {string} type - Signifies whether player is human or AI
**/
class Player {
  constructor(type) {
    this.type = type;
  }

  // convert click event into coordinate
  convertChosenMove(event) {
    return event.target.dataset.coordinate;
  }

  // generate random ai move
  getMove() {
    const letters = 'ABCDEFGHIJ';
    const number = this.#generateNumber();
    return letters[this.#generateNumber() - 1] + number;
  }

  // generates a number 1 - 10
  #generateNumber() {
    return Math.ceil(Math.random() * 10);
  }
}

export default Player;