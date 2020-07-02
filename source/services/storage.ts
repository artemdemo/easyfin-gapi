const formatKey = key => `easyfin-gapi.${key}`;

export const setItem = (key: string, value: string) => {
    localStorage.setItem(formatKey(key), value);
};

export const getItem = (key: string) => {
    return localStorage.getItem(formatKey(key));
};

export const removeItem = (key: string) => {
    return localStorage.removeItem(formatKey(key));
};
