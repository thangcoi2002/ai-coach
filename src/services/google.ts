import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import { Platform } from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

/** What the backend needs to trade a Google account for one of our sessions. */
export type GoogleCredential = {
  idToken: string;
  /** Present only with offlineAccess; lets the backend get a refresh token. */
  serverAuthCode: string | null;
  email: string;
  name: string | null;
};

const webClientId = GOOGLE_WEB_CLIENT_ID || undefined;
const iosClientId = GOOGLE_IOS_CLIENT_ID || undefined;

/**
 * Client IDs come from the Google Cloud project (see .env.example). iOS can
 * run off its own client alone; Android's Credential Manager only knows the
 * web one. Without a usable client the native SDK cannot open the picker.
 */
export const hasGoogleClientIds = Boolean(
  Platform.OS === 'ios' ? webClientId ?? iosClientId : webClientId,
);

/**
 * Thrown instead of quietly signing a mock account in: a missing client ID
 * looks exactly like "the Google sheet never opened", so say so out loud.
 */
export class GoogleNotConfiguredError extends Error {
  constructor() {
    super(
      Platform.OS === 'ios'
        ? 'Set GOOGLE_WEB_CLIENT_ID or GOOGLE_IOS_CLIENT_ID'
        : 'Set GOOGLE_WEB_CLIENT_ID',
    );
    this.name = 'GoogleNotConfiguredError';
  }
}

let isConfigured = false;

function configure() {
  if (isConfigured) {
    return;
  }
  GoogleSignin.configure({
    webClientId,
    iosClientId,
    // A serverAuthCode for the backend's refresh token needs the web client;
    // asking for one without it fails the call.
    offlineAccess: Boolean(webClientId),
    scopes: ['email', 'profile'],
  });
  isConfigured = true;
}

/** Runs the native Google sheet. Returns null when the user backs out of it. */
export async function requestGoogleCredential(): Promise<GoogleCredential | null> {
  if (!hasGoogleClientIds) {
    throw new GoogleNotConfiguredError();
  }

  configure();
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (response.type === 'cancelled') {
      return null;
    }
    const { idToken, serverAuthCode, user } = response.data;
    if (!idToken) {
      throw new Error('Google returned no ID token');
    }
    return { idToken, serverAuthCode, email: user.email, name: user.name };
  } catch (error) {
    // Android reports a dismissed sheet as an error rather than a response.
    if (isErrorWithCode(error) && error.code === statusCodes.SIGN_IN_CANCELLED) {
      return null;
    }
    throw error;
  }
}

/** Lets the next sign-in pick a different account instead of reusing the last. */
export async function signOutOfGoogle(): Promise<void> {
  if (!hasGoogleClientIds) {
    return;
  }
  configure();
  await GoogleSignin.signOut();
}
