/**
 * Module for saving and triggering events.
 *
 * @returns {Object} The public API with the subscribe() and run() functions.
 */
const eventObserver = (() => {
  // hold the event name with the functions signed up to them
  // eg { refresh: [{func: func, savedArgs: [arg1, arg2]}, {func: func2, savedArgs: []}] }
  const subscriptions = new Map();

  /**
   * Subscribes a function to an event.
   *
   * @param {String} eventName - The name of the event.
   * @param {Function} func - Function to be subscribed to the event.
   * @param {...*} savedArgs - Any arguments to be called with the function.
   * @returns {undefined|String} - Returns a string for a successful subscribe
   */
  const subscribe = (eventName, func, ...savedArgs) => {
    const funcInfo = {func, savedArgs};

    // grab event array and add function info
    if (subscriptions.has(eventName)) {
      subscriptions.get(eventName).push(funcInfo);
    } else {
      // set the new sub with the function info added to the array
      subscriptions.set(eventName, [funcInfo])
    }

    // return 'subsribed' for a successful subscribe
    if (subscriptions.get(eventName).includes(funcInfo)) return 'Subscribed!';
  }

  /**
   * Runs functions subscribed to an event.
   *
   * @param {String} eventName - The name of the event.
   * @param {...*} args - Any arguments to be called with the saved functions.
   * @returns {undefined}
   */
  const run = (eventName, ...args) => {
    if (subscriptions.has(eventName)) {
      subscriptions.get(eventName).forEach(funcInfo => {
        // if function info contains saved arguments, run them
        if (funcInfo.savedArgs.length > 0) {
          funcInfo.func.call(null, ...funcInfo.savedArgs)
        } else {
          funcInfo.func.call(null, ...args);
        }
      });
    }
  }

  /**
   * Public API for the module.
   * 
   * @returns {Object} The public API with the subscribe() and run() functions.
   */
  return { subscribe, run }
})();

export default eventObserver; 