import React, { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { Mic, Square, Upload } from 'lucide-react-native';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useAudioRecorderWithStates } from 'react-native-nitro-sound';
import PrimaryButton from '@/components/PrimaryButton';
import { GATE_SKILLS } from '@/mock/gate-skills.mock';
import type { MethodStepProps } from '@/types/diagnostic.type';
import { formatFileSize } from '@/utils/format-file-size';
import StepLayout from './StepLayout';
import { brand } from '@/theme/colors';

const RELATIONSHIPS = ['Sếp trực tiếp', 'Đồng nghiệp', 'Nhân viên của tôi', 'Khách hàng'];
/** Matches the "Tối đa 10 phút" caption on the record card. */
const MAX_RECORDING_MS = 10 * 60 * 1000;

const MIC_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
})!;

/** What's attached so far — either a picked file's real name/size, or a just-finished recording's duration. */
type AttachedMedia = { name: string; meta: string; note: string };

export default function MediaStep({ onBack, onNext }: MethodStepProps) {
  const [relationship, setRelationship] = useState(RELATIONSHIPS[2]);
  const [skills, setSkills] = useState<Set<string>>(new Set());
  const [media, setMedia] = useState<AttachedMedia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recorder = useAudioRecorderWithStates();

  // Releases the native recorder when the step unmounts (e.g. the user picks a
  // different method), not just when a recording finishes.
  useEffect(() => () => recorder.dispose(), [recorder]);

  const toggleSkill = (skill: string) => {
    setSkills(current => {
      const next = new Set(current);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const handlePickFile = async () => {
    setError(null);
    try {
      const [result] = await pick({ type: [types.audio, types.video] });
      setMedia({
        name: result.name ?? 'Tệp đã chọn',
        meta: formatFileSize(result.size),
        note: 'Đã chọn từ máy.',
      });
    } catch (err) {
      // Backing out of the picker isn't an error — anything else is worth telling
      // the user about, since it's the only feedback they'll get that it failed.
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        return;
      }
      setError('Không mở được tệp. Vui lòng thử lại.');
    }
  };

  const handleStartRecording = async () => {
    setError(null);
    const status = await request(MIC_PERMISSION);
    if (status !== RESULTS.GRANTED) {
      setError('Cần quyền micro để ghi âm. Bật quyền cho ứng dụng trong Cài đặt máy.');
      return;
    }
    try {
      await recorder.startRecorder();
    } catch {
      setError('Không bắt đầu ghi âm được. Vui lòng thử lại.');
    }
  };

  const handleStopRecording = async () => {
    const elapsedSecs = Math.floor(recorder.state.currentPosition / 1000);
    try {
      await recorder.stopRecorder();
      setMedia({
        name: 'Bản ghi vừa thu',
        meta: recorder.mmss(elapsedSecs),
        note: 'Ghi trực tiếp trong app.',
      });
    } catch {
      setError('Không lưu được bản ghi. Vui lòng thử lại.');
    }
  };

  // Auto-stop instead of just disabling input at the cap — nothing else in this
  // step polls a clock, so silently doing nothing at 10:00 would look frozen.
  useEffect(() => {
    if (recorder.state.isRecording && recorder.state.currentPosition >= MAX_RECORDING_MS) {
      handleStopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorder.state.currentPosition, recorder.state.isRecording]);

  return (
    <StepLayout badge="Cách 3 · Ghi âm hoặc video" onBack={onBack}>
      <Text className="mt-3 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
        Gửi một cuộc trò chuyện thật
      </Text>

      {recorder.state.isRecording ? (
        <View className="mt-4 items-center gap-3 rounded-2xl bg-brand-card p-6">
          <Text className="text-[13px] font-bold tracking-[0.06em] text-brand-accent">
            ĐANG GHI ÂM
          </Text>
          <Text className="text-[32px] font-bold tabular-nums text-brand-ink">
            {recorder.mmss(Math.floor(recorder.state.currentPosition / 1000))}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dừng ghi âm"
            onPress={handleStopRecording}
            className="h-14 w-14 items-center justify-center rounded-full bg-brand-accent">
            <Square size={20} color="#FFFFFF" fill="#FFFFFF" />
          </Pressable>
        </View>
      ) : (
        <View className="mt-4 flex-row gap-2.5">
          <Pressable
            accessibilityRole="button"
            onPress={handlePickFile}
            className="flex-1 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-5">
            <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint">
              <Upload size={20} color={brand.accent} />
            </View>
            <Text className="mt-2.5 text-[15px] font-bold text-brand-ink">Tải tệp lên</Text>
            <Text className="text-[13px] font-medium text-brand-body">Video hoặc âm thanh</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={handleStartRecording}
            className="flex-1 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-5">
            <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint">
              <Mic size={20} color={brand.accent} />
            </View>
            <Text className="mt-2.5 text-[15px] font-bold text-brand-ink">Ghi ngay</Text>
            <Text className="text-[13px] font-medium text-brand-body">Tối đa 10 phút</Text>
          </Pressable>
        </View>
      )}
      {error && <Text className="mt-2 text-[13px] font-semibold text-brand-accent">{error}</Text>}

      {media && (
        <View className="mt-3 rounded-2xl bg-brand-card p-4">
          <View className="flex-row items-center justify-between gap-2.5">
            <Text
              className="min-w-0 flex-1 text-[15px] font-bold text-brand-ink"
              numberOfLines={1}>
              {media.name}
            </Text>
            {!!media.meta && (
              <Text className="flex-none text-[13px] font-semibold text-brand-body">
                {media.meta}
              </Text>
            )}
          </View>
          <View className="mt-2.5 h-1.5 rounded-[3px] bg-brand-ink/12">
            <View className="h-full w-full rounded-[3px] bg-brand-accent" />
          </View>
          <Text className="mt-1.5 text-[13px] font-medium text-brand-body">{media.note}</Text>
        </View>
      )}

      <Text className="mt-5 text-[13px] font-bold text-brand-body">
        Bạn đang nói chuyện với ai?
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {RELATIONSHIPS.map(option => {
          const active = relationship === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => setRelationship(option)}
              className={`grow basis-[47%] rounded-2xl border p-3.5 ${
                active
                  ? 'border-brand-accent bg-brand-accent'
                  : 'border-brand-ink/14 bg-brand-surface'
              }`}>
              <Text
                className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-brand-ink'}`}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text className="mt-5 text-[13px] font-bold text-brand-body">
        Đọc theo kỹ năng nào trong chương trình?
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-1.5">
        {GATE_SKILLS.map(skill => {
          const active = skills.has(skill);
          return (
            <Pressable
              key={skill}
              accessibilityRole="button"
              onPress={() => toggleSkill(skill)}
              className={`rounded-full border px-3 py-2 ${
                active ? 'border-brand-ink bg-brand-ink' : 'border-brand-ink/14 bg-brand-surface'
              }`}>
              <Text className={`text-[13px] font-bold ${active ? 'text-white' : 'text-brand-ink'}`}>
                {skill}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 flex-row items-center gap-2">
        <Square size={13} color={`${brand.ink}80`} strokeWidth={1.5} />
        <Text className="text-[13px] font-semibold text-brand-body">
          Chỉ bạn xem được bản ghi này.
        </Text>
      </View>

      <View className="flex-1" />
      <View className="mt-5">
        <PrimaryButton
          label="Phân tích"
          onPress={() => onNext('Từ bản ghi một cuộc trò chuyện thật')}
          disabled={!media}
        />
      </View>
    </StepLayout>
  );
}
