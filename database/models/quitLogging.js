'use strict';
const Models = require('bookshelf-model-loader');

const QuitLogging = Models.Base.extend({
    tableName: 'quitLogging',
    hasTimestamps: ['timestamp'],
    soft: false
});

module.exports = {
    QuitLogging: Models.Bookshelf.model('quitLogging', QuitLogging)
};
