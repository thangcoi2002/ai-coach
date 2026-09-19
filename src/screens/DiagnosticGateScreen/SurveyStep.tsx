import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { DiagnosisService } from '@/services/diagnosis.service';
import { brand } from '@/theme/colors';
import type { MethodStepProps, SurveyQuestion } from '@/types/diagnostic.type';
import StepLayout from './StepLayout';

export default function SurveyStep({ onBack, onNext }: MethodStepProps) {
  const [questions, setQuestions] = useState<SurveyQuestion[] | null>(null);
  const [intakeId, setIntakeId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [index, setIndex] = useState(0);
  // Keyed by question index so the pick for the current question is easy to look up.
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadSurvey = () => {
    setLoadError(false);
    setQuestions(null);
    setIntakeId(null);
    // Both are needed before the user can submit at the end, so a failure in either
    // one is surfaced up front instead of only once they finish answering.
    Promise.all([DiagnosisService.getSurveyQuestions(), DiagnosisService.startIntake('SURVEY')])
      .then(([loadedQuestions, loadedIntakeId]) => {
        setQuestions(loadedQuestions);
        setIntakeId(loadedIntakeId);
      })
      .catch(() => setLoadError(true));
  };

  useEffect(loadSurvey, []);

  const question = questions?.[index];
  const picked = answers[index] ?? -1;
  const isLast = questions != null && index === questions.length - 1;
  const progress = questions ? ((index + 1) / questions.length) * 100 : 0;

  const goToPreviousQuestion = () => {
    setIndex(current => Math.max(current - 1, 0));
  };

  const handleNext = async () => {
    if (!questions || !intakeId || picked === -1) {
      return;
    }
    if (!isLast) {
      setIndex(current => current + 1);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      // Reaching the last question with a pick means every prior one was already
      // answered too — "Tiếp" only enables once `answers[index]` is set.
      const surveyAnswers = questions.map((questionItem, questionIndex) => ({
        questionId: questionItem.id,
        optionKey: questionItem.options[answers[questionIndex]].key,
      }));
      await DiagnosisService.submitSurvey(intakeId, surveyAnswers);
      const result = await DiagnosisService.getResult(intakeId);
      onNext(`Từ khảo sát nhanh, ${questions.length} câu`, result);
    } catch {
      setSubmitError('Không nộp được bài khảo sát. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <StepLayout badge="Cách 2 · Khảo sát nhanh" onBack={onBack}>
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-center text-[15px] font-medium text-brand-body">
            Không tải được câu hỏi khảo sát. Vui lòng thử lại.
          </Text>
          <PrimaryButton label="Thử lại" onPress={loadSurvey} />
        </View>
      </StepLayout>
    );
  }

  if (!question) {
    return (
      <StepLayout badge="Cách 2 · Khảo sát nhanh" onBack={onBack}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color={brand.accent} />
        </View>
      </StepLayout>
    );
  }

  return (
    <StepLayout badge="Cách 2 · Khảo sát nhanh" onBack={onBack} scrollKey={index}>
      <View className="mt-4 flex-row items-baseline justify-between">
        <Text className="text-[13px] font-bold text-brand-body">
          Câu {index + 1} / {questions.length}
        </Text>
        <Text className="text-[11px] font-bold tracking-[0.08em] text-brand-accent">
          {question.skill.name.toUpperCase()}
        </Text>
      </View>
      <View className="mt-2 h-1.5 rounded-[3px] bg-brand-ink/12">
        <View className="h-full rounded-[3px] bg-brand-accent" style={{ width: `${progress}%` }} />
      </View>

      <Text className="mt-5 text-[11px] font-bold tracking-[0.08em] text-brand-body">
        TÌNH HUỐNG
      </Text>
      <Text className="mt-2 text-[20px] font-bold leading-[26px] tracking-[-0.02em] text-brand-ink">
        {question.situation}
      </Text>
      <Text className="mt-2 text-[13px] font-bold text-brand-body">{question.question}</Text>

      <View className="mt-4 gap-2">
        {question.options.map((option, optionIndex) => {
          const active = picked === optionIndex;
          return (
            <Pressable
              key={option.key}
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
                {option.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {submitError && (
        <Text className="mt-3 text-center text-[13px] text-brand-accent-pressed">
          {submitError}
        </Text>
      )}

      <View className="flex-1" />
      <View className="mt-5 flex-row gap-2">
        {index > 0 && (
          <Pressable
            accessibilityRole="button"
            onPress={goToPreviousQuestion}
            className="items-center justify-center rounded-full border-[1.5px] border-brand-ink/20 px-5 py-[17px]">
            <Text className="text-[15px] font-bold text-brand-ink">Câu trước</Text>
          </Pressable>
        )}
        <View className="flex-1">
          <PrimaryButton
            label={isLast ? 'Xem kết quả' : 'Tiếp'}
            onPress={handleNext}
            disabled={picked === -1}
            loading={isSubmitting}
          />
        </View>
      </View>
    </StepLayout>
  );
}
