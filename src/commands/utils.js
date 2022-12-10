import { join, isAbsolute } from 'path';

export const toAbsolute = path => {
    return isAbsolute(path) ? path : join(process.cwd(), path);
};