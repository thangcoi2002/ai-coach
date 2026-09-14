import { Clock, Dumbbell } from 'lucide-react-native';
import type { ProgressStat } from '@/types/home.type';

/** Stand-in weekly counters until the API reports real practice activity. */
export const PROGRESS_STATS: ProgressStat[] = [
  {
    key: 'sessions',
    Icon: Dumbbell,
    iconBg: '#F2EBFA',
    iconColor: '#8558C8',
    value: '4',
    label: 'Buổi luyện',
  },
  {
    key: 'streak',
    Icon: Clock,
    iconBg: '#FFF5DC',
    iconColor: '#E4A329',
    value: '3',
    label: 'Ngày liên tiếp',
  },
];
