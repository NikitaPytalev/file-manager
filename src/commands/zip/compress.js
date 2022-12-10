import fs from 'fs';
import zlib from 'zlib';
import { basename, join } from 'path';
import { OPERATION_FAILED } from '../errors.js';
import { BROTLI_EXT } from '../consts.js';
import { validateArgumentsCount, validateIsDirectory, validateIsFile } from '../validation.js';
import { toAbsolute } from '../utils.js';


const compress = async args => {
    validateArgumentsCount(args.length, 2);

    const src = toAbsolute(args[0]);
    let dest = toAbsolute(args[1]);

    await validateIsFile(src);
    await validateIsDirectory(dest);

    const destFilePath = join(dest, basename(src)).concat(BROTLI_EXT);

    try{
        var zip = zlib.createBrotliCompress();
    
        var read = fs.createReadStream(src);
        var write = fs.createWriteStream(destFilePath);
    
        read.pipe(zip).pipe(write);	
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default compress;