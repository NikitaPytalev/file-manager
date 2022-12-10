import fs from 'fs';
import zlib from 'zlib';
import { basename, extname, join } from 'path';
import { OPERATION_FAILED } from '../errors.js';
import { BROTLI_EXT } from '../consts.js';
import { validateArgumentsCount, validateIsDirectory, validateIsFile } from '../validation.js';
import { toAbsolute } from '../utils.js';

const decompress = async args => {
    validateArgumentsCount(args.length, 2);

    const src = toAbsolute(args[0]);
    let dest = toAbsolute(args[1]);

    await validateIsFile(src);
    await validateIsDirectory(dest);

    if (!extname(src).endsWith(BROTLI_EXT)) {
        throw new Error(OPERATION_FAILED);
    }

    const destFilePath = join(dest, basename(src)).replace(BROTLI_EXT, '');

    try{
        var unzip = zlib.createBrotliDecompress();

        var read = fs.createReadStream(src);
        var write = fs.createWriteStream(destFilePath);
    
        read.pipe(unzip).pipe(write);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default decompress;