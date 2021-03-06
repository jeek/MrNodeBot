'use strict';
const rp = require('request-promise-native');
const logger = require('../../lib/logger');

module.exports = (user, repo, results) => rp({
        uri: `https://api.bitbucket.org/2.0/repositories/${user}/${repo}`,
        headers: {
            'user-agent': 'MrNodeBot'
        },
        json: true
    })
    .then(data => {
        if (!data) return results;
        results.bitBucket = {
            name: data.name,
            ownerUserName: data.owner.username,
            ownerDisplayName: data.owner.display_name,
            lastPush: data.updated_on,
            fullName: data.full_name,
            language: data.language,
            hasIssues: data.has_issues,
            desc: data.description
        };
        return results;
    })
    .catch(err => {
        logger.warn('Error in getBitbucket link function', {
            err
        });
        return results;
    });
