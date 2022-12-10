import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import { OPERATION_FAILED } from '../errors.js';
import { validateArgumentsCount, validateIsFile } from '../validation.js';
import { toAbsolute } from '../utils.js';


const hash = async args => {
    validateArgumentsCount(args.length, 1);

    const filePath = toAbsolute(args[0]);

    await validateIsFile(filePath);

    try{
        const readable = fs.createReadStream(filePath);
        const hash = createHash('sha256').setEncoding('hex');

        await pipeline(
            readable,
            hash
        );

        console.log(hash.read());
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default hash;