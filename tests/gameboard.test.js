/**
 * @jest-environment jsdom
 */

import Gameboard from 'gameboard';
import Ship from 'ship';
jest.mock('ship');

const ShipMock = Ship;

ShipMock.mockImplementation(function (name, length) {
  this.name = name;
  this.length = length;
  this.hits = 0;
  this.hit = jest.fn(() => this.hits++);
  this.isSunk = jest.fn(() => this.hits >= this.length);
});


// Gameboard Class
describe('Gameboard class', () => { 

  describe('createBoard()', () => {
    const gameboard = new Gameboard('player-board');

    it('creates a board', () => {
      expect(gameboard.board.tagName).toBe('DIV');
      expect(gameboard.board.className).toEqual(expect.stringMatching(/board/));
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
      const battleshipMock = new ShipMock('battleship', 4)
      gameboard.placeShip('A1', battleshipMock);
      expect(gameboard.cells['A1'].className.includes('battleship taken')).toBe(true);
      expect(gameboard.cells['B1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['C1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['D1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['E1'].className.includes('battleship')).not.toBe(true);
    })

    it('places a submarine (3 cells) on the board', () => {
      const submarineMock = new ShipMock('submarine', 3);
      gameboard.placeShip('D2', submarineMock);
      expect(gameboard.cells['D2'].className.includes('submarine')).toBe(true);
      expect(gameboard.cells['E2'].className.includes('submarine')).toBe(true);
      expect(gameboard.cells['F2'].className.includes('submarine taken')).toBe(true);
      expect(gameboard.cells['G2'].className.includes('submarine')).not.toBe(true);
    })

    it('only places a ship on a valid coordinate', () => {
      const carrierMock = new ShipMock('carrier', 5);
      gameboard.placeShip('H1', carrierMock);
      expect(gameboard.cells['H1'].className.includes('carrier')).not.toBe(true);
      expect(gameboard.cells['I1'].className.includes('carrier')).not.toBe(true);
      expect(gameboard.cells['J1'].className.includes('carrier taken')).not.toBe(true);
    })

    it('places a ship if there\'s just enough space', () => {
      const battleshipMock = new ShipMock('battleship', 4);
      gameboard.placeShip('G1', battleshipMock);
      expect(gameboard.cells['G1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['H1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['I1'].className.includes('battleship')).toBe(true);
      expect(gameboard.cells['J1'].className.includes('battleship taken')).toBe(true);
    })
  })

  describe('receiveAttack()', () => {
    const gameboard = new Gameboard();
    const battleshipMock = new ShipMock('battleship', 4)
    gameboard.placeShip('A1', battleshipMock);

    it('sends hit to a ship if attack is on target',  () => {
      gameboard.receiveAttack('A1');
      expect(battleshipMock.hit).toHaveBeenCalledTimes(1);
    })

    it('sends hit to a ship if attack is on target a second time', () => {
      gameboard.receiveAttack('B1');
      expect(battleshipMock.hit).toHaveBeenCalledTimes(1)
    }) 

    it('saves coordinate if attack is a miss', () => {
      gameboard.receiveAttack('B2');
      expect(gameboard.misses.includes('B2')).toBe(true);
    });
  });

  describe('allSunk()', () => {
    const gameboard = new Gameboard();
    const battleshipMock = new ShipMock('battleship', 4)
    gameboard.placeShip('A1', battleshipMock);

    it('returns false if not all ships on the board have been sunk', () => {
      gameboard.receiveAttack('A1');
      gameboard.receiveAttack('B1');
      expect(gameboard.allSunk()).toBe(false);
    })

    it('returns true if all the ships on the board have been sunk', () => {
      // battleshipMock has already been hit twice
      gameboard.receiveAttack('C1');
      gameboard.receiveAttack('D1');
      expect(gameboard.allSunk()).toBe(true);
    })
  });
});
