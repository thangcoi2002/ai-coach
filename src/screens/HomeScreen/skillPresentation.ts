import { Brain, Ear, Heart, MessageSquare, Sparkles, type LucideIcon } from 'lucide-react-native';
import { brand } from '@/theme/colors';

type SkillPresentation = {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

/**
 * Icon/color aren't part of GET /api/skills — the program's skill set is fixed, so
 * this maps each one's stable `code` to how it's drawn. An unrecognized code (a skill
 * added on the backend before this map is updated) falls back to a generic look
 * instead of crashing.
 */
const PRESENTATION_BY_CODE: Record<string, SkillPresentation> = {
  LANG_NGHE_CHU_DONG: { Icon: Ear, iconBg: '#EAF3FF', iconColor: '#3B82D0' },
  PHAN_HOI_XAY_DUNG: { Icon: MessageSquare, iconBg: '#EAF7EF', iconColor: '#2DA968' },
  GIAO_TIEP_THAU_CAM: { Icon: Heart, iconBg: '#F2EBFA', iconColor: '#8558C8' },
  KIEM_SOAT_CAM_XUC: { Icon: Brain, iconBg: '#FFF5DC', iconColor: '#E4A329' },
  BAN_HANG_EQ: { Icon: Sparkles, iconBg: brand.card, iconColor: brand.body },
};

const DEFAULT_PRESENTATION: SkillPresentation = {
  Icon: Sparkles,
  iconBg: brand.card,
  iconColor: brand.body,
};

export function getSkillPresentation(code: string): SkillPresentation {
  return PRESENTATION_BY_CODE[code] ?? DEFAULT_PRESENTATION;
}
