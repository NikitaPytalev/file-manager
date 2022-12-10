import { INVALID_INPUT, OPERATION_FAILED } from "./errors.js";
import { lstat } from 'fs/promises';

export const validateArgumentsCount = (actual, expected) => {
    if (actual !== expected) {
        throw new Error(INVALID_INPUT);
    }
};

export const validateIsDirectory = async path => {
    try {
        const isDirectory = (await lstat(path)).isDirectory();

        if (!isDirectory) 
            throw new Error();
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const validateIsFile = async path => {
    try {
        const isFile = (await lstat(path)).isFile();

        if (!isFile) 
            throw new Error(OPERATION_FAILED);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};
