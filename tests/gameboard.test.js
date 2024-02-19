/**
 * @jest-environment jsdom
 */

import Gameboard from 'gameboard';

// Gameboard Class
describe('Gameboard class', () => {  
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
      const battleshipMock = {name: 'battleship', length: 4}
      gameboard.placeShip('A1', battleshipMock);
      expect(gameboard.cells['A1'].className.includes('battleship taken')).toBe(true);
      expect(gameboard.cells['B1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['C1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['D1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['E1'].className.includes('battleship')).not.toBe(true);
    })

    it('places a submarine (3 cells) on the board', () => {
      let submarineMock = { name: 'submarine', length: 3 };
      gameboard.placeShip('D2', submarineMock);
      expect(gameboard.cells['D2'].className.includes('submarine')).toBe(true);
      expect(gameboard.cells['E2'].className.includes('submarine')).toBe(true);
      expect(gameboard.cells['F2'].className.includes('submarine taken')).toBe(true);
      expect(gameboard.cells['G2'].className.includes('submarine')).not.toBe(true);
    })
  })

  describe('receiveAttack()', () => {
    const gameboard = new Gameboard();
    const shipMock = jest.fn(() => {
      return { name: 'battleship', length: 4, hit() { this.hits++ }, hits: 0 };
    })()
    gameboard.placeShip('A1', shipMock);
    // Spy to see if hit() is called on the shipMock
    const hitSpy = jest.spyOn(shipMock, 'hit');

    it('sends hit to a ship if attack is on target (1)',  () => {
      gameboard.receiveAttack('A1');
      expect(hitSpy).toHaveBeenCalledTimes(1)
    })

    it('sends hit to a ship if attack is on target (2)', () => {
      gameboard.receiveAttack('C1');
      expect(hitSpy).toHaveBeenCalledTimes(1)
    }) 

    it('saves coordinate if attack is a miss', () => {
      gameboard.receiveAttack('B2');
      expect(gameboard.misses.includes('B2')).toBe(true);
    });

});