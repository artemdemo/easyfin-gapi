/**
 * CLIENT_ID and API_KEY
 * are available here https://console.developers.google.com/apis/credentials
 */
import { TSpreadsheetsApi } from './TSpreadsheetsApi';

const getClientId = () => {
    if (ENV.clientId) {
        return ENV.clientId;
    }
    throw new Error('No clientId found');
};

const getApiKey = () => {
    if (ENV.apiKey) {
        return ENV.apiKey;
    }
    throw new Error('No apiKey found');
};

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

export const load = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    script.onload = () => {
        gapi.load('client:auth2', () => {
            resolve();
        });
    };

    document.body.appendChild(script);
});

export const init = () => new Promise((resolve, reject) => {
    gapi.client
        .init({
            apiKey: getApiKey(),
            clientId: getClientId(),
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        })
        .then(
            resolve,
            reject,
        );
});

export const getBasicProfile = () => {
    return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
};

export const getIsSignedIn = () => {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
};

export const listenIsSignedIn = (cb: (isSignedIn: boolean) => void) => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(cb);
};

export const getSpreadsheetsInstance = (): TSpreadsheetsApi => {
    // @ts-ignore
    return gapi.client.sheets.spreadsheets;
};
