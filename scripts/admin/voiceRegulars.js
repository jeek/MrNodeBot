'use strict';
const scriptInfo = {
    name: 'Voice Regulars',
    desc: 'Voice users by participation',
    createdBy: 'IronY'
};
const _ = require('lodash');
const gen = require('../lib/_voiceUsersInChannel');

module.exports = app => {
    // No Database
    if (!app.Database) return scriptInfo;

    // Get threshold
    const threshold = (_.isUndefined(app.Config.features.voiceRegulars) || !_.isSafeInteger(app.Config.features.voiceRegulars) || app.Config.features.voiceRegulars < 1) ?  app.Config.features.voiceRegulars.threshold : 250;

    const voiceRegulars = (to, from, text, message) => {
        let txtArray = text.split(' ');
        let channel = null;
        let thresh = null;

        switch (txtArray.length) {
            case 1:
                channel = _.isEmpty(txtArray[0]) ? to : txtArray[0];
                thresh = threshold;
                break;
            case 2:
                channel = txtArray[0];
                thresh = txtArray[1] % 1 === 0 ? txtArray[1] : threshold;
                break;
        }

        gen(channel, thresh, app)
          .then(result => app.say(from, result))
          .catch(err => app.say(from, `Error ${err.message}`));
    };

    // Terminate the bot and the proc watcher that keeps it up
    app.Commands.set('voice-regulars', {
        desc: '[Channel?] [Threshold?] Voice the regulars in a channel',
        access: app.Config.accessLevels.admin,
        call: voiceRegulars
    });

    // Return the script info
    return scriptInfo;
};
