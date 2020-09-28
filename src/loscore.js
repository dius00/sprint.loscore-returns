// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    const result = [];
    for (const element of array) {
      if (result.includes(element) === false) {
        result.push(element);
      }
    }
    return result;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    const array = [];
    this.each(collection, (...args) => array.push(iteratee(args[0])));
    return array;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    return this.filter(collection, (...args) => !test(args[0]));
  }

  reduce(collection, iterator, accumulator) {
    let result = 0;
    if (accumulator === undefined) {
      result = collection[0];
      this.each(collection, (item, index) => {
        if (index > 0) {
          result = iterator(result, item);
        }
      });
    } else {
      result = accumulator;
      this.each(collection, (item) => {
        result = iterator(result, item);
      });
    }
    return result;
  }

  every(collection, test) {
    return this.reduce(
      collection,
      (isittrue, item) => {
        if (test === undefined) {
          return item;
        }
        if (!isittrue) {
          return false;
        }
        if (isittrue && test(item)) {
          return isittrue;
        }
      },
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(...objs) {
    for (let i = 1; i < objs.length; i++) {
      this.each(objs[i], (item, key) => {
        objs[0][key] = item;
      });
    }
    return objs[0];
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    // YOUR CODE HERE
    let result = null;
    let FirstRun = true;
    return (...args) => {
      if (FirstRun) {
        result = func(args);
        FirstRun = false;
        return result;
      }
      return result;
    };
  }

  memoize(func) {
    const cache = {};
    return function(...input) {
      if (!cache[input]) {
        cache[input] = func(input);
        return cache[input];
      }
      return cache[input];
    };
  }

  invoke(collection, functionOrKey) {
    if (typeof functionOrKey === "string") {
      return this.map(collection, (value) => value[functionOrKey].apply(value));
    } else if (typeof functionOrKey === "function") {
      return this.map(collection, (value) => functionOrKey.apply(value));
    }
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
