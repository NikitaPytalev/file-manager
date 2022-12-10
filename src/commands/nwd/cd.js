import {validateArgumentsCount, validateIsDirectory} from '../validation.js';
import { toAbsolute } from '../utils.js';

const cd = async args => {
    validateArgumentsCount(args.length, 1);

    const dest = toAbsolute(args[0]);

    await validateIsDirectory(dest);

    process.chdir(dest);
} 

export default cd; 