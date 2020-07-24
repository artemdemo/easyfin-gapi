export type TAction<T> = {
    type: string;
    payload?: T;
};

export type TActionHandlers<T, U> = {
    [key: string]: (state: T, action: TAction<U>) => T
};
