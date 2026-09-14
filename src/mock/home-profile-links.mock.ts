import { ClipboardList, FileText } from 'lucide-react-native';
import type { ProfileLink } from '@/types/home.type';

/** Rows are real destinations; the trailing counts/dates stand in until the API reports them. */
export const PROFILE_LINKS: ProfileLink[] = [
  { key: 'reports', Icon: FileText, label: 'Báo cáo đã có', trailing: '6' },
  {
    key: 'reassess',
    Icon: ClipboardList,
    label: 'Đánh giá lại các kỹ năng',
    trailing: '2 tháng 7',
  },
];
