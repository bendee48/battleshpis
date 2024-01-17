import Ship from 'ship';

// Ship Class
describe('Ship Class', () => {
  const battleship = new Ship(4);
  const submarine = new Ship(3);
  const patrolBoat = new Ship(2);

  describe('.length', () => {
    it('returns the length of a battleship', () => {
      expect(battleship.length).toBe(4);
    })

    it('returns the length of a submarine', () => {
      expect(submarine.length).toBe(3);
    });

    it('returns the length of a submarine', () => {
      expect(patrolBoat.length).toBe(2);
    });
  });

  describe('.hits', () => {
    it('returns number of hits to ship', () => {
      expect(battleship.hits).toBe(0);
    });
  })

  describe('hit()', () => {
    it('increases the number of hits a ship has suffered by one', () => {
      const ship = new Ship();
      ship.hit();
      expect(ship.hits).toBe(1);
    })

    it('increases the total no. of hits after multiple blows', () => {
      const ship = new Ship();
      for (let i = 0; i < 3; i++) ship.hit();
      expect(ship.hits).toBe(3);
    })
  });

  describe('isSunk()', () => {
    it('returns true if ship has been hit more times than it\'s length', () => {
      const submarine = new Ship(3);
      for (let i = 0; i < 3; i++) submarine.hit();
      expect(submarine.isSunk()).toBe(true);
    })

    it('returns false if ship hasn\'t been hit more times than it\'s length', () => {
      const submarine = new Ship(3);
      for (let i = 0; i < 2; i++) submarine.hit();
      expect(submarine.isSunk()).toBe(false);
    })
  });
});