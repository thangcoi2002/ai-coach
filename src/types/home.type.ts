import type { LucideIcon } from 'lucide-react-native';

export type HomeSkill = {
  key: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  name: string;
} & ({ measured: true; progress: number; score: string } | { measured: false; hint: string });

export type ProgressStat = {
  key: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
};

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

export type TodaySession = {
  eyebrow: string;
  title: string;
  subtitle: string;
  duration: string;
};
