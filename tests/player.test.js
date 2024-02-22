import Player from 'player';

// Tests for Player class
describe('Player', () => {
  let player = new Player('human');

  describe('.type', () => {
    it('returns whether the player is human or AI', () => {
      expect(player.type).toBe('human');
    });
  });

  describe('convertChosenMove()', () => {
    it('returns the players chosen attack of A1', () => {
      let eventMock = {target: {dataset: {coordinate: 'A1'}}};
      expect(player.convertChosenMove(eventMock)).toBe('A1');
    })

    it('returns the players chosen attack of H2', () => {
      let eventMock = {target: {dataset: {coordinate: 'H2'}}};
      expect(player.convertChosenMove(eventMock)).toBe('H2');
    })
  })

  describe('getMove()', () => {
    let playerAI = new Player('ai');
    it('chooses a random valid coordinate', () => {
      for (let i = 0; i < 50; i++) {
        const coord = playerAI.getMove();
        expect(coord).toEqual(expect.stringMatching(/^[A-J]([1-9]|10)$/));
      }
    })
  })
});