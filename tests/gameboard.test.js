import Gameboard from 'gameboard';

// Gameboard Class
describe('Gameboard class', () => {
  const gameboard = new Gameboard();

  describe('.placeShip()', () => {
    it('places a ship on the board', () => {
      let battleship = jest.mock('ship'); // battleship is 4 length
      gameboard.placeShip('a1', battleship);
      expect(gameboard.cells['a1'].className.includes('battleship')).toBe(true);
      // add remaining ships coords to test
    })
  })


});