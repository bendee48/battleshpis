const hello = require('./hello');

test('testing', () => {
  expect(hello()).toBe('hello');
})