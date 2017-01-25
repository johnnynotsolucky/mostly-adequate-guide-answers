/*
Spin on the example in Part 1.
Load first 10 stories from a user defined feed.

npm run "example:part1" [top/new/best/ask/show/job]
*/

import R from 'ramda';
import request from 'request';

const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const topStoriesUrl = (feed) =>
  `https://hacker-news.firebaseio.com/v0/${feed}stories.json`;
const itemDetailsUrl = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const Impure = {
  getJson: R.curry((callback, url) => {
    request.get(url, (...args) => {
      const [,,body] = args;
      callback(body);
    });
  }),
};

const toJson = (str) => JSON.parse(str);
const title = R.compose(trace('title:'), R.prop('title'), toJson);
const getItemDetails = R.compose(Impure.getJson(title), itemDetailsUrl);
const getItems = R.compose(R.forEach(getItemDetails), R.take(10), toJson);
const app = R.compose(Impure.getJson(getItems), topStoriesUrl);
app(process.argv[2]);
