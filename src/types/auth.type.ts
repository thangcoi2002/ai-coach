/** Matches GET /api/me exactly — no client-only fields. */
export type AuthUser = {
  id: number;
  name: string;
  email: string;
  companyId: number | null;
  onboarded: boolean;
  locale: string;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
