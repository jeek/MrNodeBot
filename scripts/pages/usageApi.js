'use strict';
const scriptInfo = {
    name: 'usageApi',
    desc: 'The Usage Express API',
    createdBy: 'IronY'
};
const _ = require('lodash');
const logger = require('../../lib/logger');
const Models = require('bookshelf-model-loader');
const getUsageOverTime = require('../generators/_getUsageOverTime');
const getUsageChansAvail = require('../generators/_getUsageChannelsAvailable');
const hashPattern = new RegExp('%23', 'g');

module.exports = app => {
    // No Database
    if (!Models.Logging) return scriptInfo;

    // Provide a list of channels we have logging information on
    app.WebRoutes.set('api.usage.channels.available', {
        desc: 'Get a list of channels available',
        path: '/api/usage/channels/available/:channel?',
        name: 'api.usage.channels.available',
        verb: 'get',
        handler: (req, res) => {
            let channel = req.params.channel && _.isString(req.params.channel) ? req.params.channel.replace(hashPattern, '#') : null;
            getUsageChansAvail(app, channel)
                .then(results =>
                    res.json({
                        status: 'success',
                        channels: results
                    })
                )
                .catch(err => {
                    logger.error('Error in api.usage.channels.available', {
                        err
                    });
                    res.json({
                        status: 'error'
                    });
                });
        }
    });

    // Subscribe to web service
    app.WebRoutes.set('api.usage.channels.overtime', {
        desc: 'Get Usage Over Time',
        path: '/api/usage/channels/overtime/:channel/:nick?',
        name: 'api.usage.channels.overtime',
        verb: 'get',
        handler: (req, res) => {
            getUsageOverTime(req.params.channel.replace(hashPattern, '#'), req.params.nick)
                .then(results => {
                    // No Results available
                    if (!results) return res.json({
                        message: 'No results available',
                        status: 'error',
                        results: [],
                    });

                    results.status = 'success';
                    res.json(results);
                })
                .catch(err => {
                    logger.error('Error fetching usage stats', {
                        err
                    });
                    res.json({
                        status: 'error',
                        results: []
                    });
                });
        },
    });

    return scriptInfo;
};
