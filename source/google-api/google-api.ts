/**
 * CLIENT_ID and API_KEY
 * are available here https://console.developers.google.com/apis/credentials
 */
import { createNanoEvents } from 'nanoevents';
import { TSpreadsheetsApi } from './TSpreadsheetsApi';
import { getRandom } from '../services/numbers';
import { apiKey, clientId } from '../services/settingsStorage';
import getGapi from './services/gapi';
import BasicProfile = gapi.auth2.BasicProfile;

const emitter = createNanoEvents();

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

const GOOGLE_SCRIPT_ID = `apis-google-client-${getRandom(5)}`;
const DATA_LOADED_ATTR_NAME = 'data-gapi-loaded';
const SCRIPT_GAPI_LOADED = 'SCRIPT_GAPI_LOADED';

export const _load = () => new Promise((resolve) => {
    let scriptEl = <HTMLScriptElement> document.getElementById(GOOGLE_SCRIPT_ID);
    if (scriptEl) {
        if (scriptEl.getAttribute(DATA_LOADED_ATTR_NAME) !== 'true') {
            const unbind = emitter.on(SCRIPT_GAPI_LOADED, () => {
                resolve();
                // This event should be called only once.
                // Since the script is loaded only at the start of the app.
                unbind();
            })
        } else {
            resolve();
        }
    } else {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('id', GOOGLE_SCRIPT_ID);
        scriptEl.setAttribute(DATA_LOADED_ATTR_NAME, 'false');
        scriptEl.src = 'https://apis.google.com/js/client.js';

        scriptEl.onload = () => {
            getGapi().load('client:auth2', () => {
                scriptEl.setAttribute(DATA_LOADED_ATTR_NAME, 'true');
                emitter.emit(SCRIPT_GAPI_LOADED);
                resolve();
            });
        };

        document.body.appendChild(scriptEl);
    }
});

export const _init = () => new Promise((resolve, reject) => {
    if (!getGapi().client.getToken()) {
        getGapi().client
            .init({
                apiKey: apiKey.get(),
                clientId: clientId.get(),
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })
            .then(
                resolve,
                reject,
            );
    } else {
        resolve();
    }
});

export const loadAndInit = () => {
    return _load()
        .then(_init)
};

export const getBasicProfile = (): Promise<BasicProfile> => {
    return loadAndInit()
        .then(() => {
            return getGapi().auth2.getAuthInstance().currentUser.get().getBasicProfile();
        });
};

export const getIsSignedIn = (): Promise<boolean> => {
    return loadAndInit()
        .then(() => {
            return getGapi().auth2.getAuthInstance().isSignedIn.get();
        });
};

export const listenIsSignedIn = (cb: (isSignedIn: boolean) => void): void => {
    loadAndInit()
        .then(() => {
            getGapi().auth2.getAuthInstance().isSignedIn.listen(cb);
        });
};

export const getSpreadsheetsInstance = (): Promise<TSpreadsheetsApi> => {
    return loadAndInit()
        .then(() => {
            // @ts-ignore
            return getGapi().client.sheets.spreadsheets;
        });
}
