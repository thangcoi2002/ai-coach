import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, Text, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { ANALYSIS_MOMENTS, ANALYSIS_REPORT } from '@/mock/analysis-report.mock';
import { brand } from '@/theme/colors';
import AvatarBadge from './ReportStep/AvatarBadge';

type Props = {
  momentIndex: number;
  onChangeMoment: (momentIndex: number) => void;
  onBack: () => void;
};

type Phase = 'play' | 'ready' | 'listening' | 'thinking' | 'result';

const STEP_LABEL: Record<Phase, string> = {
  play: 'ĐANG PHÁT CÂU TRƯỚC ĐÓ',
  ready: 'ĐẾN LƯỢT BẠN',
  listening: 'ĐANG GHI ÂM',
  thinking: 'ĐANG XỬ LÝ',
  result: 'KẾT QUẢ',
};

const BAR_HEIGHTS = [14, 30, 42, 22, 36, 18, 26];

function WaveformBars({ playing }: { playing: boolean }) {
  const values = useRef(BAR_HEIGHTS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (!playing) {
      values.forEach(value => {
        value.stopAnimation();
        value.setValue(0);
      });
      return;
    }
    const loops = values.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 450 + (index % 4) * 60,
            delay: index * 70,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 450 + (index % 4) * 60,
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    loops.forEach(loop => loop.start());
    return () => loops.forEach(loop => loop.stop());
  }, [playing, values]);

  return (
    <View className="h-[22px] flex-row items-center gap-[3px]">
      {BAR_HEIGHTS.map((height, index) => {
        // Named out of the JSX (rather than an inline `style={{...}}`) so the
        // per-bar height and animated transform can stay dynamic without tripping
        // react-native/no-inline-styles.
        const barStyle = {
          height: playing ? height : 6,
          // Always an array, never toggled to/from `undefined` — swapping a
          // transform between an array and undefined crashes RN's style diffing.
          // Idle state is just the animated value parked at 0 (see the effect above).
          transform: [
            {
              scaleY: values[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0.35, 1],
              }),
            },
          ],
        };
        return (
          <Animated.View
            key={index}
            className="w-[3px] rounded-sm bg-brand-accent"
            style={barStyle}
          />
        );
      })}
    </View>
  );
}

/**
 * "Nói lại khoảnh khắc" — dark full-bleed redo screen. There's no real speech
 * capture wired up yet, so `phase` just times out on its own instead of reacting to
 * an actual recording, and "CÁCH BẠN VỪA NÓI" plays back the moment's suggested
 * line as a stand-in for what the user said.
 */
export default function RedoStep({ momentIndex, onChangeMoment, onBack }: Props) {
  const moment = ANALYSIS_MOMENTS[Math.min(momentIndex, ANALYSIS_MOMENTS.length - 1)];
  const total = ANALYSIS_MOMENTS.length;
  const [phase, setPhase] = useState<Phase>('play');
  const [attempt, setAttempt] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    setPhase('play');
    setHintOpen(false);
    const timer = setTimeout(() => setPhase('ready'), 2600);
    return () => clearTimeout(timer);
  }, [momentIndex, attempt]);

  useEffect(() => {
    if (phase !== 'thinking') {
      return;
    }
    const timer = setTimeout(() => setPhase('result'), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleMicTap = () => {
    if (phase === 'play' || phase === 'ready') {
      setPhase('listening');
      return;
    }
    if (phase === 'listening') {
      setPhase('thinking');
    }
  };

  const handleRetry = () => setAttempt(current => current + 1);
  const handleNext = () => {
    if (momentIndex < total - 1) {
      onChangeMoment(momentIndex + 1);
    } else {
      onBack();
    }
  };

  const showOld = phase !== 'result';
  const showYouNew = phase === 'thinking' || phase === 'result';
  const showResult = phase === 'result';
  const showMic = phase !== 'result' && phase !== 'thinking';
  const micActive = phase === 'listening';
  const micButtonStyle = {
    backgroundColor: micActive ? brand.accent : 'rgba(255,255,255,0.1)',
    borderColor: micActive ? brand.accent : 'rgba(255,255,255,0.35)',
  };

  const micHint =
    phase === 'listening' ? 'Chạm để dừng' : phase === 'play' ? 'Chạm để bỏ qua và nói ngay' : 'Chạm để nói';

  return (
    <View className="flex-1 bg-brand-night px-5">
      <View className="h-[34px] flex-row items-center justify-between">
        <Pressable accessibilityRole="button" onPress={onBack}>
          <Text className="text-[13px] font-bold text-white/60">‹ Báo cáo</Text>
        </Pressable>
        <View className="rounded-full bg-white/10 px-2.5 py-[5px]">
          <Text className="whitespace-nowrap text-[11px] font-bold text-white">
            Nói lại · Khoảnh khắc {momentIndex + 1} / {total}
          </Text>
        </View>
      </View>

      <Text className="mt-4 text-[11px] font-bold tracking-[0.08em] text-brand-accent">
        {STEP_LABEL[phase]}
      </Text>
      <Text className="mt-1.5 text-[20px] font-bold leading-[26px] tracking-[-0.02em] text-white">
        Thực hành lại tình huống
      </Text>

      <View className="mt-5 gap-2.5">
        <View className="gap-2.5 rounded-[20px] border border-white/[0.14] bg-white/[0.08] p-4">
          <View className="flex-row items-center gap-2.5">
            <AvatarBadge initial={ANALYSIS_REPORT.themInitial} size={36} tone="them" />
            <Text className="flex-1 text-[13px] font-bold text-white">
              {ANALYSIS_REPORT.themName}
            </Text>
            <WaveformBars playing={phase === 'play'} />
          </View>
          <Text className="text-[15px] font-medium leading-[23.25px] text-white/90">
            {moment.before}
          </Text>
        </View>

        {showOld && (
          <View className="gap-1.5 rounded-[20px] border border-dashed border-white/25 p-3.5">
            <Text className="text-[11px] font-bold text-white/50">Lần thật bạn đã nói</Text>
            <Text className="text-[13px] font-medium leading-[19.5px] text-white/60 line-through">
              {moment.you}
            </Text>
          </View>
        )}

        {showYouNew && (
          <View className="gap-1.5 rounded-[20px] bg-white p-3.5">
            <Text className="text-[11px] font-bold tracking-[0.08em] text-brand-accent-pressed">
              CÁCH BẠN VỪA NÓI
            </Text>
            <Text className="text-[15px] font-semibold leading-[22.5px] text-brand-ink">
              {moment.alt.redo}
            </Text>
          </View>
        )}

        {showResult && (
          <>
            <View className="flex-row gap-2">
              <View className="flex-1 gap-1.5 rounded-2xl border border-white/[0.18] p-3">
                <Text className="text-[11px] font-bold text-white/50">Lần thật</Text>
                <Text className="text-[13px] font-bold text-white">{moment.alt.oldState}</Text>
                <Text className="text-[11px] font-medium leading-[16.5px] text-white/60">
                  {moment.alt.oldShort}
                </Text>
              </View>
              <View className="flex-1 gap-1.5 rounded-2xl border border-brand-accent bg-brand-accent/16 p-3">
                <Text className="text-[11px] font-bold text-brand-accent">Lần này</Text>
                <Text className="text-[13px] font-bold text-white">{moment.alt.newState}</Text>
                <Text className="text-[11px] font-medium leading-[16.5px] text-white/75">
                  {moment.alt.newShort}
                </Text>
              </View>
            </View>
            <View className="mt-1 gap-3">
              <View className="gap-[3px]">
                <Text className="text-[11px] font-bold tracking-[0.08em] text-[#6FCF97]">
                  TỐT HƠN Ở ĐÂU
                </Text>
                <Text className="text-[14px] font-semibold leading-[21.7px] text-white">
                  {moment.alt.coach}
                </Text>
              </View>
              <View className="gap-[3px]">
                <Text className="text-[11px] font-bold tracking-[0.08em] text-white/50">
                  VẪN CÒN THIẾU GÌ
                </Text>
                <Text className="text-[13px] font-medium leading-[19.5px] text-white/80">
                  {moment.alt.gap}
                </Text>
              </View>
              <View className="gap-[3px] border-l-2 border-brand-accent pl-3">
                <Text className="text-[11px] font-bold tracking-[0.08em] text-brand-accent">
                  NẾU MUỐN MẠNH HƠN NỮA
                </Text>
                <Text className="text-[13px] font-medium leading-[19.5px] text-white/90">
                  {moment.alt.adjust}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      <View className="flex-1" />

      {hintOpen && !showResult && (
        <View className="mb-3.5 gap-1 border-l-[3px] border-brand-accent pl-3">
          <Text className="text-[11px] font-bold tracking-[0.08em] text-brand-accent">
            GỢI Ý LÀM LẠI
          </Text>
          <Text className="text-[13px] font-medium italic leading-[19.5px] text-white/[0.85]">
            {moment.alt.redo}
          </Text>
        </View>
      )}

      {phase === 'thinking' && (
        <View className="mb-6 items-center">
          <ActivityIndicator color={brand.accent} />
        </View>
      )}

      {showMic && (
        <View className="mb-5 items-center gap-3">
          <Pressable
            accessibilityRole="button"
            onPress={handleMicTap}
            className="h-[84px] w-[84px] items-center justify-center rounded-full border-2"
            style={micButtonStyle}>
            <Mic size={26} color={brand.surface} />
          </Pressable>
          <Text className="text-[13px] font-bold text-white/70">{micHint}</Text>
          <Pressable accessibilityRole="button" onPress={() => setHintOpen(current => !current)}>
            <Text className="text-[13px] font-bold text-white/50">
              {hintOpen ? 'Ẩn gợi ý' : 'Xem gợi ý làm lại'}
            </Text>
          </Pressable>
        </View>
      )}

      {showResult && (
        <View className="mb-6 gap-2.5">
          <Pressable
            accessibilityRole="button"
            onPress={handleNext}
            className="min-h-[52px] items-center justify-center rounded-2xl bg-white">
            <Text className="text-[15px] font-bold text-brand-ink">
              {momentIndex < total - 1 ? `Khoảnh khắc 0${momentIndex + 2} ›` : 'Xong, về báo cáo'}
            </Text>
          </Pressable>
          <View className="flex-row gap-2.5">
            <Pressable
              accessibilityRole="button"
              onPress={handleRetry}
              className="flex-1 min-h-11 items-center justify-center rounded-2xl border-[1.5px] border-white/30">
              <Text className="text-[13px] font-bold text-white">Nói lại lần nữa</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              className="flex-1 min-h-11 items-center justify-center rounded-2xl border-[1.5px] border-white/30">
              <Text className="text-[13px] font-bold text-white">Về báo cáo</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
