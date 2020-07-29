export type TAction<T> = {
    type: string;
    payload?: T;
};

export type TActionHandlers<T> = {
    [key: string]: (state: T, action: TAction<any>) => T
};
