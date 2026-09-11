import React from 'react';
import { Text, View } from 'react-native';
import { Brain, Ear, Heart, MessageSquare, Sparkles, type LucideIcon } from 'lucide-react-native';
import { brand } from '@/theme/colors';
import { cardShadow } from '@/theme/card';

type Skill = {
  key: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  name: string;
} & (
  | { measured: true; progress: number; score: string }
  | { measured: false; hint: string }
);

const SKILLS: Skill[] = [
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

export default function SkillsCard() {
  return (
    <View>
      <View className="flex-row items-baseline justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink">Kỹ năng đang mở</Text>
        <Text className="text-xs text-brand-body">{SKILLS.length} kỹ năng</Text>
      </View>
      <View className="mt-3 rounded-[20px] border border-[#F0F0F0] bg-brand-surface px-4" style={cardShadow}>
        {SKILLS.map((skill, index) => (
          <View
            key={skill.key}
            className={`flex-row items-center gap-3 py-[13px] ${
              index < SKILLS.length - 1 ? 'border-b border-[#F0F0F0]' : ''
            }`}>
            <View
              className="h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: skill.iconBg }}>
              <skill.Icon size={18} color={skill.iconColor} />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-[15px] font-semibold text-brand-ink">{skill.name}</Text>
              {skill.measured ? (
                <View className="mt-1.5 h-[5px] rounded-[3px] bg-[#EAEAEA]">
                  <View
                    className="h-full rounded-[3px]"
                    style={{ width: `${skill.progress * 100}%`, backgroundColor: skill.iconColor }}
                  />
                </View>
              ) : (
                <Text className="mt-0.5 text-xs text-brand-body">{skill.hint}</Text>
              )}
            </View>
            <Text
              className="text-[15px] font-semibold"
              style={{ color: skill.measured ? brand.ink : brand.divider }}>
              {skill.measured ? skill.score : '—'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
