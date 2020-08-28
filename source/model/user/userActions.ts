import { createAction } from 'redux-actions';
import BasicProfile = gapi.auth2.BasicProfile;

export type TSignedInPayload = BasicProfile;
export type TSignedIn = (payload: TSignedInPayload) => void;
export const signedIn = createAction('SIGNED_IN');
export const signedOut = createAction('SIGNED_OUT');
