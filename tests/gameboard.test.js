/**
 * @jest-environment jsdom
 */

import Gameboard from 'gameboard';

// Gameboard Class
describe('Gameboard class', () => {
  const gameboard = new Gameboard();

  describe('.createBoard()', () => {
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

  describe('.placeShip()', () => {
    it('places a ship on the board', () => {
      let battleship = jest.mock('ship'); // battleship is 4 length
      gameboard.placeShip('a1', battleship);
      expect(gameboard.cells['a1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['a2'].className.includes('battleship')).toBe(true);
      // expect(gameboard.cells['a3'].className.includes('battleship')).toBe(true);
      // expect(gameboard.cells['a4'].className.includes('battleship')).toBe(true);
    })
  })


});