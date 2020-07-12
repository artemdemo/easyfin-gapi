/**
 * Simple wrapper for the global `gapi` variable.
 * Introduced so it will be easier to mock it.
 */
const getGapi = () => {
    if (window.hasOwnProperty('gapi')) {
        return window.gapi;
    }
    throw new Error('gapi is not defined in the global scope');
};

export default getGapi;
