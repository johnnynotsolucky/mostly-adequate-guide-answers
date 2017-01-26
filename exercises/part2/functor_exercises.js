import R from 'ramda';
import { task as Task } from 'folktale/data/task';

class Identity {
  constructor(x) {
    this.__value = x;
  }

  map(f) {
    return Identity.of(f(this.__value));
  }

  static of(x) {
    return new Identity(x);
  }
}

class Maybe {
  constructor(x) {
    this.__value = x;
  }

  isNothing() {
    return this.__value === null || this.__value === undefined;
  }

  map(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }

  static of(x) {
    return new Maybe(x);
  }
}

class Left {
  constructor(x) {
    this.__value = x;
  }

  map(f) {
    return this;
  }

  static of(x) {
    return new Left(x);
  }
}

class Right {
  constructor(x) {
    this.__value = x;
  }

  map(f) {
    return Right.of(f(this.__value));
  }

  static of(x) {
    return new Right(x);
  }
}

class IO {
  constructor(f) {
    this.unsafePerformIO = f;
  }

  map(f) {
    return new IO(R.compose(f, this.unsafePerformIO));
  }

  static of(x) {
    return new IO(() => x);
  }
}

// Exercise 1
// ==========
// Use _.add(x,y) and _.map(f,x) to make a function that increments a value
// inside a functor.

// ex1 :: Identity Number -> Identity Number
const ex1 = (value) => value.map(R.add(1));

// Exercise 2
// ==========
// Use _.head to get the first element of the list.

// ex2 :: Identity [a] -> Identity a
const ex2 = R.map(R.head);

// // Exercise 3
// // ==========
// // Use safeProp and _.head to find the first initial of the user.

const safeProp = R.curry((x, o) => Maybe.of(o[x]));
// XXX is this definition correct?
// ex3 :: a -> Maybe b
const ex3 = R.compose(R.map(R.head), safeProp('name'));

// Exercise 4
// ==========
// Use Maybe to rewrite ex4 without an if statement.
// ex4 :: String -> Number
const ex4 = R.compose(R.map(parseInt), Maybe.of);

// Exercise 5
// ==========
// Write a function that will getPost then toUpperCase the post's title.

// getPost :: Int -> Future({id: Int, title: String})
const getPost = (i) =>
  Task((resolver) => {
    setTimeout(() => {
      resolver.resolve({
        id: i,
        title: 'Love them futures',
      });
    }, 300);
  });

// uppercase :: String -> String
const uppercase = R.compose(str => str.toUpperCase(), R.prop('title'));
// ex5 :: Int -> Future(String)
const ex5 = R.compose(R.map(uppercase), getPost);


// Exercise 6
// ==========
// Write a function that uses checkActive() and showWelcome() to grant access
// or return the error.

const showWelcome = R.compose(R.concat( "Welcome "), R.prop('name'));
const checkActive = (user) =>
  user.active ? Right.of(user) : Left.of('Your account is not active');
// ex6 :: a -> Either(String, _)
const ex6 = R.compose(R.map(showWelcome), checkActive);

// Exercise 7
// ==========
// Write a validation function that checks for a length > 3. It should return
// Right(x) if it is greater than 3 and Left("You need > 3") otherwise.
// ex7 :: a -> Either(String, a)
const ex7 = (x) => x.length > 3 ? Right.of(x) : Left.of('You need > 3'); // <--- write me. (don't be pointfree)

// Exercise 8
// ==========
// Use ex7 above and Either as a functor to save the user if they are valid or
// return the error message string. Remember either's two arguments must return
// the same type.

const either = R.curry((leftF, rightF, x) => {
  switch (x.constructor) {
    case Left:
      return leftF(x.__value);
    case Right:
      return rightF(x.__value);
  }
});

const save = (x) => new IO(() => x + '-saved');
// ex8 :: String -> String
const ex8 = R.compose(either(IO.of, save), ex7);

export default { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8 };

export {
  Identity,
  Maybe,
  Left,
  Right,
  IO,
};
