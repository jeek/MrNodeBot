'use strict';
const Models = require('bookshelf-model-loader');

const KickLogging = Models.Base.extend({
    tableName: 'kickLogging',
    hasTimestamps: ['timestamp'],
    soft: false
});

module.exports = {
    KickLogging: Models.Bookshelf.model('kickLogging', KickLogging)
};
