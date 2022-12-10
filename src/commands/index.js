import { INVALID_INPUT } from './errors.js';
import cd from './nwd/cd.js';
import ls from './nwd/ls.js';
import up from './nwd/up.js';

const commands = {
    cd,
    ls,
    up,
};

export default commandName => {
    if (!commands.hasOwnProperty(commandName)) {
        throw new Error(INVALID_INPUT);
    }
    return commands[commandName];
}