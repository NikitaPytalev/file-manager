import { validateArgumentsCount } from '../validation.js';
import { join } from 'path';

const up = async args => {
    validateArgumentsCount(args.length, 0);
    process.chdir(join(process.cwd(), '../'));
} 

export default up;