'use strict';

const config = require('../../config');

exports.up = function(knex, Promise) {
  // Not Needed in SQLite
  if(config.knex.engine == 'sqlite') {
    return new Promise(res => {
      console.log('Sqlite detected, no database change needed');
      return res();
    });
  }
  return knex.raw('ALTER TABLE topics MODIFY topic VARCHAR(65536);');
};

exports.down = function(knex, Promise) {
};
