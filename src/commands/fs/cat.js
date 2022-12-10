import fs from 'fs';
import { OPERATION_FAILED } from '../errors.js';
import { validateArgumentsCount, validateIsFile } from '../validation.js';
import { toAbsolute } from '../utils.js';
import { stdout } from 'process';


const cat = async args => {
    validateArgumentsCount(args.length, 1);

    const filePath = toAbsolute(args[0]);

    await validateIsFile(filePath);
    
    const readFile = () => {
        return new Promise((resolve, reject) => {              
            const fileReadable = fs.createReadStream(filePath);
            fileReadable
                .pipe(process.stdout)
                .on('error', (error) => reject(error));
                
            fileReadable.on('end', () => {
                process.stdout.write('\n');
                resolve();
            });
        });
    };

    try{
        await readFile();
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export default cat;