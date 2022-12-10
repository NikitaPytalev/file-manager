import { rename } from 'fs/promises';
import { OPERATION_FAILED } from '../errors.js';
import { validateArgumentsCount, validateIsDirectory, validateIsFile } from '../validation.js';
import { toAbsolute } from '../utils.js';
import { basename, join } from 'path';

const mv = async args => {
    validateArgumentsCount(args.length, 2);

    const src = toAbsolute(args[0]);
    const dest = toAbsolute(args[1]);
    
    try{
        await validateIsFile(src);
        await validateIsDirectory(dest);
    
        const destFilePath = join(dest, basename(src));
        
        await rename(src, destFilePath);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default mv;