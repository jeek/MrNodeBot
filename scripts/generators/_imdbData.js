'use strict';
const _ = require('lodash');
const rp = require('request-promise-native');

// Accept call types
const validTypes = [
    'title',  // Get movie by Title
    'id'  // Get Movie By Name
];

// Base Options for IMDB
const baseOptions = {
    uri: 'https://www.omdbapi.com',
    qs: {
        plot: 'short',
        r: 'json'
    },
    json: true
};

// Build the Request Options object
const getRpOptions = (text, type) => {
    switch (type) {
        case 'id':
            return _.merge(baseOptions, {
                qs: {
                    i: text
                }
            });
        case 'title':
        default:
            return _.merge(baseOptions, {
                qs: {
                    t: text
                }
            });
    }
};

// Export the generator
module.exports = (text, type) => {
    [type] = type.split(' ');
    return rp(getRpOptions(text, _.includes(validTypes, type) ? type : validTypes[0]));
};
