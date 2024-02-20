import Player from 'player';

// Tests for Player class
describe('Player', () => {
  let player = new Player('human');

  describe('.type', () => {
    it('returns whether the player is human or AI', () => {
      expect(player.type).toBe('human');
    });
  });
});