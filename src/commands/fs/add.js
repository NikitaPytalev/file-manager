import { writeFile } from 'fs/promises';
import { OPERATION_FAILED } from '../errors.js';
import { validateArgumentsCount } from '../validation.js';
import { toAbsolute } from '../utils.js';

const add = async args => {
    validateArgumentsCount(args.length, 1);

    try{
        const fileName = args[0];
        const filePath = toAbsolute(fileName);

        await writeFile(filePath, '', { flag: 'wx' });
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default add;