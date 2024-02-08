/**
 * @jest-environment jsdom
 */

import Gameboard from 'gameboard';
import Ship from 'ship';
jest.mock('ship');

beforeEach(() => {
  // Clear all instances and calls to constructor
  Ship.mockClear();
});

// Gameboard Class
describe('Gameboard class', () => {
  // Mock implementaiton of Ship class
  const shipMock = jest.fn().mockImplementation((name, length) => {
    return { name, length };
  });
  Ship.mockImplementation(shipMock);
  
  describe('createBoard()', () => {
    const gameboard = new Gameboard();

    it('creates a board', () => {
      expect(gameboard.board.tagName).toBe('DIV');
      expect(gameboard.board.className).toBe('board');
    })

    it('creates a board with 100 cells', () => {
      expect(gameboard.board.childElementCount).toBe(100);
    })

    it('labels each cell with a coordinate', () => {
      expect(gameboard.board.childNodes[0].dataset.coordinate).toBe('A1');
      expect(gameboard.board.childNodes[9].dataset.coordinate).toBe('J1');
      expect(gameboard.board.childNodes[44].dataset.coordinate).toBe('E5');
      expect(gameboard.board.childNodes[76].dataset.coordinate).toBe('G8');
      expect(gameboard.board.childNodes[99].dataset.coordinate).toBe('J10');
    })
  })

  describe('placeShip()', () => {
    const gameboard = new Gameboard();

    it('places a battleship (4 cells) on the board', () => {
      let battleship = new Ship('battleship', 4);
      gameboard.placeShip('A1', battleship);
      expect(gameboard.cells['A1'].className.includes('battleship taken')).toBe(true);
      expect(gameboard.cells['B1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['C1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['D1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['E1'].className.includes('battleship')).not.toBe(true);
    })

    it('places a submarine (3 cells) on the board', () => {
      let submarine = new Ship('submarine', 3);
      gameboard.placeShip('D2', submarine);
      expect(gameboard.cells['D2'].className.includes('submarine')).toBe(true);
      expect(gameboard.cells['E2'].className.includes('submarine')).toBe(true);
      expect(gameboard.cells['F2'].className.includes('submarine taken')).toBe(true);
      expect(gameboard.cells['G2'].className.includes('submarine')).not.toBe(true);
    })
  })


});