import eventObserver from 'eventObserver';

// eventObserver module
describe('eventObserver', () => {
  
  describe('subscribe()', () => {
    it('signs up a function to a new event', () => {
      const mockFn = jest.fn();
      const expected = [{func: mockFn, savedArgs: []}]
      expect(eventObserver.subscribe('update page', mockFn)).toBe('Subscribed!');
      expect(eventObserver.subscriptions.get('update page')).toEqual(expect.arrayContaining(expected));
    });
    
    it('signs up a function to an existing event', () => {
      const mockFn2 = jest.fn();
      const expected = [{func: mockFn2, savedArgs: []}]
      expect(eventObserver.subscribe('update page', mockFn2)).toBe('Subscribed!');
      expect(eventObserver.subscriptions.get('update page')).toEqual(expect.arrayContaining(expected));
    });
  })

  describe('unsubscribe()', () => {
    it('removes a function from an event', () => {
      const mockFn = jest.fn();
      eventObserver.subscribe('update page', mockFn);
      // create copy of list of current functions attached to event
      const expected = [...eventObserver.subscriptions.get('update page')];
      expect(eventObserver.unsubscribe('update page', mockFn)).toBe('Unsubscribed.');
      expect(eventObserver.subscriptions.get('update page')).not.toEqual(expect.arrayContaining(expected));
    });
  })

  describe('run()', () => {
    it('calls the subscribed functions when an event is ran', () => {
      const mockFn = jest.fn();
      eventObserver.subscribe('update page', mockFn);
      eventObserver.run('update page');
      expect(mockFn).toHaveBeenCalled();
    })

    it('calls the subscribed functions if arguments are provided', () => {
      const mockFn = jest.fn((arg1, arg2) => [arg1, arg2]);
      eventObserver.subscribe('load', mockFn);
      eventObserver.run('load', 'arg1', 'arg2');
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    })

    it('calls the subscribed functions with saved arguments, if present', () => {
      const mockFn = jest.fn();
      const arg1 = 'foo';
      const arg2 = 'pop';
      eventObserver.subscribe('refresh', mockFn, arg1, arg2);
      eventObserver.run('refresh');
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
    })
  })
});