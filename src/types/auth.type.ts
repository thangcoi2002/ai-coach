export type AuthUser = {
  id: number;
  name: string;
  email: string;
  companyId: number | null;
  onboarded: boolean;
  locale: string;
  /**
   * Null until the user finishes the post-login diagnostic gate. Stored as the raw
   * level so it survives copy changes and stays comparable — screens format it.
   * Not part of the backend's /api/me contract; tracked locally on the session.
   */
  level: number | null;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
