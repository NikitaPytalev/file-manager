import { unlink } from 'fs/promises';
import { OPERATION_FAILED } from '../errors.js';
import { validateArgumentsCount } from '../validation.js';
import { toAbsolute } from '../utils.js';


const rm = async args => {
    validateArgumentsCount(args.length, 1);

    const filePath = toAbsolute(args[0]);

    try{
        await unlink(filePath);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default rm;