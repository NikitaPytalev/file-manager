import { INVALID_INPUT } from './errors.js';
import add from './fs/add.js';
import cat from './fs/cat.js';
import cd from './nwd/cd.js';
import cp from './fs/cp.js';
import ls from './nwd/ls.js';
import mv from './fs/mv.js';
import os from './os/os.js';
import rm from './fs/rm.js';
import rn from './fs/rn.js';
import up from './nwd/up.js';

const commands = {
    add,
    cat,
    cd,
    cp,
    ls,
    ls,
    mv,
    os,
    rm,
    rn,
    up
};

export default commandName => {
    if (!commands.hasOwnProperty(commandName)) {
        throw new Error(INVALID_INPUT);
    }
    return commands[commandName];
}