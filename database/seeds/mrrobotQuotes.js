'use strict';
const quotes = require('././mrrobotQuotes.json').showQuotes;
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mrrobotQuotes').del()
    .then(function () {
      promises = [];
      quotes.forEach(quote => promises.push(knex('mrrobotQuotes').insert({quote})));
      return Promise.all(promises);
    });
};
