import { rename } from 'fs/promises';
import { OPERATION_FAILED } from '../errors.js';
import { validateArgumentsCount } from '../validation.js';
import { toAbsolute } from '../utils.js';

const rn = async args => {
    validateArgumentsCount(args.length, 2);

    const src = toAbsolute(args[0]);
    const dest = toAbsolute(args[1]);

    try{
        await rename(src, dest);
    } catch {
        throw new Error(OPERATION_FAILED);
    } 
};

export default rn;