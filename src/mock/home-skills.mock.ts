import { Brain, Ear, Heart, MessageSquare, Sparkles } from 'lucide-react-native';
import { brand } from '@/theme/colors';
import type { HomeSkill } from '@/types/home.type';

/** Stand-in skill levels until the API returns the user's real measurements. */
export const HOME_SKILLS: HomeSkill[] = [
  {
    key: 'listening',
    Icon: Ear,
    iconBg: '#EAF3FF',
    iconColor: '#3B82D0',
    name: 'Lắng nghe chủ động',
    measured: true,
    progress: 0.65,
    score: '6.5',
  },
  {
    key: 'feedback',
    Icon: MessageSquare,
    iconBg: '#EAF7EF',
    iconColor: '#2DA968',
    name: 'Phản hồi xây dựng',
    measured: true,
    progress: 0.62,
    score: '6.2',
  },
  {
    key: 'empathy',
    Icon: Heart,
    iconBg: '#F2EBFA',
    iconColor: '#8558C8',
    name: 'Giao tiếp thấu cảm',
    measured: true,
    progress: 0.61,
    score: '6.1',
  },
  {
    key: 'composure',
    Icon: Brain,
    iconBg: '#FFF5DC',
    iconColor: '#E4A329',
    name: 'Kiểm soát cảm xúc',
    measured: true,
    progress: 0.65,
    score: '6.5',
  },
  {
    key: 'eq-selling',
    Icon: Sparkles,
    iconBg: brand.card,
    iconColor: brand.body,
    name: 'Bán hàng bằng thông minh cảm xúc',
    measured: false,
    hint: 'Chưa đo · gửi bản ghi hoặc diễn tập',
  },
];
