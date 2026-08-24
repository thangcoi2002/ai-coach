declare module '@env' {
  export const API_URL: string;
  /** OAuth client of type "Web" — also what the backend verifies ID tokens against. */
  export const GOOGLE_WEB_CLIENT_ID: string;
  /** OAuth client of type "iOS". Leave empty to fall back to GoogleService-Info.plist. */
  export const GOOGLE_IOS_CLIENT_ID: string;
}
