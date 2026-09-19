import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cardClassName, cardShadow } from '@/theme/card';
import { brand } from '@/theme/colors';

type Props = {
  text: string;
  themName: string;
};

const REMINDERS = ['Trước cuộc họp 1-1 tới', 'Sáng mai', 'Không nhắc'];

/** Committing outlines the card in accent; the checkbox and chips keep hairlines. */
const CHECKBOX_BORDER = 'rgba(15,23,42,0.25)';
const CHIP_BORDER = 'rgba(15,23,42,0.14)';

/**
 * "Chốt việc phải thay đổi". Committing is in scope; the "· Xem" link to a saved
 * commitments list (handoff section 08) isn't built yet, so that row is a
 * non-interactive confirmation rather than a dead link.
 */
export default function CommitCard({ text, themName }: Props) {
  const [committed, setCommitted] = useState(false);
  const [reminderIndex, setReminderIndex] = useState(0);

  return (
    <View className="mt-1.5">
      <Text className="text-[19px] font-semibold tracking-[-0.02em] text-brand-ink">
        Chốt việc phải thay đổi
      </Text>
      <Text className="mt-1 text-[13px] text-brand-mute">
        Một việc mang vào cuộc trò chuyện thật tiếp theo.
      </Text>
      <View
        className={`mt-2 gap-3.5 p-5 ${cardClassName}`}
        style={[cardShadow, { borderColor: committed ? brand.accentOutline : undefined }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setCommitted(current => !current)}
          className="flex-row items-start gap-3">
          <View
            className="mt-0.5 h-[26px] w-[26px] items-center justify-center rounded-[9px] border-[1.5px]"
            style={{
              borderColor: committed ? brand.accent : CHECKBOX_BORDER,
              backgroundColor: committed ? brand.accent : brand.surface,
            }}>
            {committed && <Check size={14} color={brand.surface} strokeWidth={3} />}
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-[15px] font-semibold leading-[21.75px] text-brand-ink">
              {text}
            </Text>
            <Text className="mt-1 text-[13px] text-brand-mute">
              Từ cuộc trò chuyện này với {themName}
            </Text>
          </View>
        </Pressable>

        {committed ? (
          <>
            <View className="gap-2.5 rounded-[14px] bg-brand-page p-3.5">
              <Text className="text-[11px] font-bold tracking-[0.1em] text-brand-mute">
                NHẮC TÔI
              </Text>
              <View className="flex-row flex-wrap gap-1.5">
                {REMINDERS.map((label, index) => {
                  const active = reminderIndex === index;
                  return (
                    <Pressable
                      key={label}
                      accessibilityRole="button"
                      onPress={() => setReminderIndex(index)}
                      className="min-h-[34px] justify-center rounded-full border px-3"
                      style={{
                        borderColor: active ? brand.night : CHIP_BORDER,
                        backgroundColor: active ? brand.night : brand.surface,
                      }}>
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: active ? brand.surface : brand.night }}>
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View className="min-h-12 items-center justify-center rounded-[14px] border-[1.5px] border-brand-ink">
              <Text className="text-sm font-semibold text-brand-ink">
                Đã ghi vào Việc phải thay đổi · Xem
              </Text>
            </View>
          </>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={() => setCommitted(true)}
            className="min-h-12 items-center justify-center rounded-[14px] border-[1.5px] border-brand-ink">
            <Text className="text-sm font-semibold text-brand-ink">Tôi sẽ làm việc này</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
