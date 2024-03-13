import eventObserver from 'eventObserver';

// eventObserver module
describe('eventObserver', () => {
  const mockFn = jest.fn();
  const mockFn2 = jest.fn();
  
  describe('subscribe()', () => {
    it('signs up a function to a new event', () => {
      expect(eventObserver.subscribe('update page', mockFn)).toBe('Subscribed!');
    });

    it('signs up a function to an existing event', () => {
      expect(eventObserver.subscribe('update page', mockFn2)).toBe('Subscribed!');
    });
  })

  describe('run()', () => {
    it('calls the subscribed functions when an event is ran', () => {
      eventObserver.run('update page');
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn2).toHaveBeenCalled();
    })

    it('calls the subscribed functions if arguments are provided', () => {
      const mockFn3 = jest.fn((arg1, arg2) => [arg1, arg2]);
      eventObserver.subscribe('load', mockFn3);
      eventObserver.run('load', 'arg1', 'arg2');
      expect(mockFn3).toHaveBeenCalled();
      expect(mockFn3).toHaveBeenCalledWith('arg1', 'arg2');
    })

    it('calls the subscribed functions with saved arguments, if present', () => {
      const mockFn4 = jest.fn();
      const arg1 = 'foo';
      const arg2 = 'pop';
      eventObserver.subscribe('refresh', mockFn4, arg1, arg2);
      eventObserver.run('refresh');
      expect(mockFn4).toHaveBeenCalled();
      expect(mockFn4).toHaveBeenCalledWith(arg1, arg2);
    })
  })
});