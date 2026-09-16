import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cardClassName, cardShadow } from '@/theme/card';

type Props = {
  text: string;
  themName: string;
};

const REMINDERS = ['Trước cuộc họp 1-1 tới', 'Sáng mai', 'Không nhắc'];

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
      <Text className="mt-1 text-[13px] text-[#64748B]">
        Một việc mang vào cuộc trò chuyện thật tiếp theo.
      </Text>
      <View
        className={`mt-2 gap-3.5 p-5 ${cardClassName}`}
        style={[cardShadow, { borderColor: committed ? 'rgba(250,101,69,0.5)' : undefined }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setCommitted(current => !current)}
          className="flex-row items-start gap-3">
          <View
            className="mt-0.5 h-[26px] w-[26px] items-center justify-center rounded-[9px] border-[1.5px]"
            style={{
              borderColor: committed ? '#FA6545' : 'rgba(15,23,42,0.25)',
              backgroundColor: committed ? '#FA6545' : '#FFFFFF',
            }}>
            {committed && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-[15px] font-semibold leading-[21.75px] text-brand-ink">
              {text}
            </Text>
            <Text className="mt-1 text-[13px] text-[#64748B]">
              Từ cuộc trò chuyện này với {themName}
            </Text>
          </View>
        </Pressable>

        {committed ? (
          <>
            <View className="gap-2.5 rounded-[14px] bg-brand-page p-3.5">
              <Text className="text-[11px] font-bold tracking-[0.1em] text-[#64748B]">
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
                        borderColor: active ? '#0F172A' : 'rgba(15,23,42,0.14)',
                        backgroundColor: active ? '#0F172A' : '#FFFFFF',
                      }}>
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: active ? '#FFFFFF' : '#0F172A' }}>
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
