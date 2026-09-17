import type { LucideIcon } from 'lucide-react-native';

/** Icon/color for a stat tile — not part of the API, purely how it's drawn. */
export type ProgressStat = {
  key: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
};

/** TODO: replace with the real shape once GET /api/home returns a non-empty commitments array. */
export type Commitment = {
  id: string;
  text: string;
  done: boolean;
};

export type ProfileLink = {
  key: 'reports' | 'reassess';
  Icon: LucideIcon;
  label: string;
  trailing: string;
};

/** The session AK-44/Màn 12 schedules next, part of GET /api/home. */
export type NextSession = {
  id: string;
  skillName: string;
  sessionIndex: number;
  title: string;
  personaName: string;
  estimatedMinutes: number;
};

/** Shape returned by GET /api/home — everything the home screen needs in one request. */
export type HomeData = {
  streakDays: number;
  sessionsThisWeek: number;
  nextSession: NextSession | null;
  commitments: unknown[];
};
