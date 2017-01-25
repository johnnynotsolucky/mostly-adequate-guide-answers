import R from 'ramda';
import accounting from 'accounting';

// Example Data
const CARS = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true,
}, {
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false,
}, {
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false,
}, {
  name: 'Audi R8',
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false,
}, {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
}, {
  name: 'Pagani Huayra',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false,
}];

// Exercise 1:
// ============
// Use R.compose() to rewrite the function below. Hint: R.prop() is curried.
const inStock = R.prop('in_stock');
const isLastInStock = R.compose(inStock, R.last);
// Alternative: R.compose(inStock('in_stock'), R.last);

// Exercise 2:
// ============
// Use R.compose(), R.prop() and R.head() to retrieve the name of the first car.
const nameOfCar = R.prop('name');
const nameOfFirstCar = R.compose(nameOfCar, R.head);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
const _average = (xs) => R.reduce(R.add, 0, xs) / xs.length; // <- leave be

const mapToDollarValue = R.map(R.prop('dollar_value'));
const averageDollarValue = R.compose(_average, mapToDollarValue);

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of
// lowercase and underscored car's names:
// e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}])
// => ['ferrari_ff'].
const _underscore = R.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
const _lowercase = (str) => str.toLowerCase();
const sanitizeInput = R.compose(_underscore, _lowercase, R.prop('name'));
var sanitizeNames = R.map(sanitizeInput);

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const join = (joinWith) => {
  return (xs) => {
    return xs.join(joinWith);
  };
};
const formatMoney = R.compose(accounting.formatMoney, R.prop('dollar_value'));
const availablePrices = R.compose(join(', '), R.map(formatMoney), R.filter(inStock));

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use R.flip().

const sortByHorsepower = R.sortBy(R.prop('horsepower'));
// This is not actually pointfree
// const out = (name) => `${name} is the fastest`;

// From the "official" answers:
const prepend = R.flip(R.concat);
const fastestCar = R.compose(
  prepend(' is the fastest'),
  R.prop('name'),
  R.last,
  sortByHorsepower);

export default {
  CARS,
  isLastInStock,
  nameOfFirstCar,
  averageDollarValue,
  sanitizeNames,
  availablePrices,
  fastestCar,
};
