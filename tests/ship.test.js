import Ship from 'ship';

// Ship Class
describe('Ship Class', () => {
  let ship = new Ship();

  describe('length property', () => {
    it('returns the length of the ship', () => {
      expect(ship.length).toBe(4);
    })
  });
});