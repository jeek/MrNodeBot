'use strict';
// Get a Line(s) from FML
// INPUT:
//   count - The amount of lines to return
// OUTPUT:
//   an array of strings containing FML lines
const _ = require('lodash');
const xray = require('x-ray')();

module.exports = count => new Promise(
    (resolve, reject) => xray('https://www.fmylife.com/random', ['p.block>a'])
    (
        (err, results) => {
            // Error In request
            if (err) return reject(err);
            // No Results
            if (!_.isArray(results) || _.isEmpty(results)) return reject(new Error('No FML Results are available'));
            // Undercase
            let normalized = _.map(results, r => r.trim());
            resolve(_.sampleSize(normalized, count || 1));
        }
    )
);
