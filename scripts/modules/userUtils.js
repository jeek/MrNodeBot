'use strict';
const scriptInfo = {
    name: 'User Utilities',
    file: 'userUtils.js',
    desc: 'Provides Registration and other User management functionality',
    createdBy: 'Dave Richer'
};

module.exports = app => {
    // Register a User
    // Current use case: User is already registered with services, but can register and be able to
    // identify with other nicks/hosts
    const register = (to, from, text, message) => {
        let args = text.split(' ');
        if (!args[0]) {
            app.say(from, 'A Email is required');
            return;
        }
        if (!args[1]) {
            app.say(from, 'A Password is required');
            return;
        }
        app._userManager.create(from, args[0], args[1], message.host).then(result => {
            app.say(from, 'Your account has been created');
            // Log the user in here
        })
        .catch(err => {
            app.say(from, 'Something went wrong creating your account, the username may exist');
        });
    };

    /**
      Master Account command, used for delegating to other commands or providing help
    **/
    const account = (to, from, text, message) => {
        if (!text) {
            app.say(from, 'Please refer to my help before you tamper with me.');
            return;
        }

        // Process text
        text = text.split(' ');
        let command = text.splice(0,1).toString();
        let subCommand = text.splice(0,1).toString();
        text = text.join(' ');

        switch (command) {
            case 'register':
                register(to, from, text, message);
                break;
            case 'help':
                if (!subCommand) {
                    app.say(from, 'The following are valid commands, use account help [command], for more information.');
                    app.say(from, 'register');
                    return;
                }
                switch (subCommand) {
                    case 'register':
                        app.say(from, '[email] [password] - Register your nickname');
                        break;
                    default:
                        app.say(from, `${subCommand} is not a valid account command, please try account help`);
                        break;
                }
                break;
            default:
                app.say(from, `${command} is not a valid account command, please try account help`);
                break;
        }
    };
    app.Commands.set('account', {
        desc: 'Account services, please use account help for more information',
        access: app.Config.accessLevels.identified,
        call: account
    });

    // Return the script info
    return scriptInfo;
};