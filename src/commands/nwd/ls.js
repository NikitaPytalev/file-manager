import { validateArgumentsCount, validateIsDirectory } from '../validation.js';
import { readdir } from 'fs/promises';

const ls = async args => {
    validateArgumentsCount(args.length, 0);

    const currentPath = process.cwd();

    validateIsDirectory(currentPath);

    const dirents = await readdir(currentPath, { withFileTypes: true });
    const fileModels = dirents
        .sort((left, right) => {
            const isLeftDirectory = left.isDirectory();
            const isRightDirectory = right.isDirectory();

            if(isLeftDirectory && !isRightDirectory) {
                return -1;
            }

            if(isRightDirectory && !isLeftDirectory) {
                return 1;
            }

            return 0;
        })
        .map(dirent => ({
            Name: dirent.name,
            Type: dirent.isDirectory() ? 'directory' : 'file'
        }));

    console.table(fileModels);
};

export default ls;