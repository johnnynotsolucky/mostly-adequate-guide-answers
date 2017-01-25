import R from 'ramda';
// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

// const split = (split) => {
//   return (str) => {
//     return str.split(split);
//   };
// };
const split = R.curry((split, str) => str.split(split));
const words = split(' ');

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

// const map = (fn) => {
//   return (arr) => {
//     return arr.map(fn);
//   };
// };
const map = R.curry((fn, arr) => arr.map(fn));
const sentences = map(words);


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

// const match = (pattern) => {
//   return (x) => {
//     return x.match(pattern);
//   };
// };
const match = R.curry((pattern, x) => x.match(pattern));

// const filter = (fn) => {
//   return (xs) => {
//     return xs.filter(fn);
//   };
// };
const filter = R.curry((fn, xs) => xs.filter(fn));
const filterQs = filter(match(/q/i));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
const _keepHighest = (x, y) => x >= y ? x : y;

// const reduce = (fn, initialValue) => {
//   return (arr) => {
//     return arr.reduce(fn, initialValue);
//   };
// };
const reduce = R.curry((fn, initialValue, arr) => arr.reduce(fn, initialValue));
const max = reduce(_keepHighest, -Infinity);


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)

// const slice = (start) => {
//   return (end) => {
//     return (arr) => {
//       return arr.slice(start, end);
//     };
//   };
// };
const slice = R.curry((start, end, arr) => arr.slice(start, end));

// Bonus 2:
// ============
// Use slice to define a function "take" that takes n elements from the beginning of the string. Make it curried.
// // Result for "Something" with n=4 should be "Some"
const take = slice(0);

export default { words, sentences, filterQs, max, slice, take };
