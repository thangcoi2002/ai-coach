export type AuthUser = {
  id: string;
  name: string;
  email: string;
  /**
   * Null until the user finishes the post-login diagnostic gate. Stored as the raw
   * level so it survives copy changes and stays comparable — screens format it.
   */
  level: number | null;
};

export type Session = {
  token: string;
  user: AuthUser;
};
