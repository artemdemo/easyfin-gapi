import { nanoid } from 'nanoid';

export const generateId = (size: number = 12) => {
    return nanoid(size);
};
