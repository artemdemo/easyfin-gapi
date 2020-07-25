export type TRouterMatch<T> = {
    isExact: boolean;
    params: T;
    path: string;
    url: string;
};
