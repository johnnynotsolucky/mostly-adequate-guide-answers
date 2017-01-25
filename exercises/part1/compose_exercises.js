import _ from 'ramda';
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
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
const inStock = _.prop('in_stock');
const isLastInStock = _.compose(inStock, _.last);
// Alternative: _.compose(inStock('in_stock'), _.last);

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
const nameOfCar = _.prop('name');
const nameOfFirstCar = _.compose(nameOfCar, _.head);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
const _average = (xs) => _.reduce(_.add, 0, xs) / xs.length; // <- leave be

const mapToDollarValue = _.map(_.prop('dollar_value'));
const averageDollarValue = _.compose(_average, mapToDollarValue);

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of
// lowercase and underscored car's names:
// e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}])
// => ['ferrari_ff'].
const _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
const _lowercase = (str) => str.toLowerCase();
const sanitizeInput = _.compose(_underscore, _lowercase, _.prop('name'));
var sanitizeNames = _.map(sanitizeInput);

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const join = (joinWith) => {
  return (xs) => {
    return xs.join(joinWith);
  };
};
const formatMoney = _.compose(accounting.formatMoney, _.prop('dollar_value'));
const availablePrices = _.compose(join(', '), _.map(formatMoney), _.filter(inStock));

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

const sortByHorsepower = _.sortBy(_.prop('horsepower'));
// This is not actually pointfree
// const out = (name) => `${name} is the fastest`;

// From the "official" answers:
const prepend = _.flip(_.concat);
const fastestCar = _.compose(
  prepend(' is the fastest'),
  _.prop('name'),
  _.last,
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
