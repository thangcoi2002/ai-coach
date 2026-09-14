import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import PrimaryButton from '@/components/PrimaryButton';
import { SURVEY_QUESTIONS } from '@/mock/survey-questions.mock';
import type { MethodStepProps } from '@/types/diagnostic.type';
import StepLayout from './StepLayout';

export default function SurveyStep({ onBack, onNext }: MethodStepProps) {
  const [index, setIndex] = useState(0);
  // Keyed by question index so stepping back shows what the user already answered.
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = SURVEY_QUESTIONS[index];
  const picked = answers[index] ?? -1;
  const isLast = index === SURVEY_QUESTIONS.length - 1;
  const progress = ((index + 1) / SURVEY_QUESTIONS.length) * 100;

  const handleBack = () => {
    if (index === 0) {
      onBack();
      return;
    }
    setIndex(current => current - 1);
  };

  // Answers only live here, so a stack-level back would throw away the whole run.
  // Claim Android back and the iOS swipe for the chevron's one-question step instead.
  usePreventRemove(true, handleBack);

  const handleNext = () => {
    if (picked === -1) {
      return;
    }
    if (isLast) {
      onNext(`Từ khảo sát nhanh, ${SURVEY_QUESTIONS.length} câu`);
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <StepLayout badge="Cách 2 · Khảo sát nhanh" onBack={handleBack} scrollKey={index}>
      <View className="mt-4 flex-row items-baseline justify-between">
        <Text className="text-[13px] font-bold text-brand-body">
          Câu {index + 1} / {SURVEY_QUESTIONS.length}
        </Text>
        <Text className="text-[11px] font-bold tracking-[0.08em] text-brand-accent">
          {question.skill}
        </Text>
      </View>
      <View className="mt-2 h-1.5 rounded-[3px] bg-brand-ink/12">
        <View className="h-full rounded-[3px] bg-brand-accent" style={{ width: `${progress}%` }} />
      </View>

      <Text className="mt-5 text-[11px] font-bold tracking-[0.08em] text-brand-body">
        TÌNH HUỐNG
      </Text>
      <Text className="mt-2 text-[20px] font-bold leading-[26px] tracking-[-0.02em] text-brand-ink">
        {question.question}
      </Text>
      <Text className="mt-2 text-[13px] font-bold text-brand-body">Bạn thường làm gì nhất?</Text>

      <View className="mt-4 gap-2">
        {question.options.map((option, optionIndex) => {
          const active = picked === optionIndex;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => setAnswers(current => ({ ...current, [index]: optionIndex }))}
              className={`flex-row items-start gap-2.5 rounded-2xl border-[1.5px] p-3.5 ${
                active
                  ? 'border-brand-accent bg-brand-card'
                  : 'border-brand-ink/12 bg-brand-surface'
              }`}>
              <View
                className={`mt-0.5 h-4 w-4 rounded-full border-[1.5px] ${
                  active ? 'border-brand-accent bg-brand-accent' : 'border-brand-ink/30'
                }`}
              />
              <Text className="min-w-0 flex-1 text-[15px] font-semibold leading-[23px] text-brand-ink">
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="flex-1" />
      <View className="mt-5">
        <PrimaryButton
          label={isLast ? 'Xem kết quả' : 'Tiếp'}
          onPress={handleNext}
          disabled={picked === -1}
        />
      </View>
    </StepLayout>
  );
}
