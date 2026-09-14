import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LiveKitRoom, useTracks, VideoTrack } from '@livekit/react-native';
import { Track } from 'livekit-client';
import { Send } from 'lucide-react-native';
import BackHeaderRow from '@/components/BackHeaderRow';
import { useThemeColors } from '@/context/ThemeProvider';
import { DEMO_PERSONA, DEMO_SCENARIO } from '@/services/roleplay.service';
import { useRoleplaySession } from './useRoleplaySession';

export default function RoleplayVideoScreen() {
  const { session, credentials, turns, status, error, sending, send, end } = useRoleplaySession();
  const [draft, setDraft] = useState('');
  const colors = useThemeColors();

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    send(text);
  }

  return (
    <View className="flex-1 bg-brand-page dark:bg-brandDark-page">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <BackHeaderRow onPress={end} />

        <View className="px-5 pb-2">
          <Text className="text-[17px] font-bold text-brand-ink dark:text-brandDark-ink">
            {DEMO_PERSONA.display_name}
          </Text>
          <Text className="text-[13px] text-brand-body dark:text-brandDark-body">
            {DEMO_SCENARIO.title}
          </Text>
        </View>

        <View className="mx-5 h-72 overflow-hidden rounded-[20px]" style={{ backgroundColor: '#151221' }}>
          {credentials ? (
            <View style={{ flex: 1 }}>
              <LiveKitRoom
                serverUrl={credentials.endpoint}
                token={credentials.token}
                connect
                audio={false}
                video={false}>
                <AvatarStage />
              </LiveKitRoom>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center gap-3">
              <ActivityIndicator color="#ffffff" />
              <Text className="px-6 text-center text-[13px] text-white/70">
                {status === 'error'
                  ? (error ?? 'Không kết nối được avatar.')
                  : 'Đang kết nối avatar…'}
              </Text>
            </View>
          )}
        </View>

        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={12}>
          <ScrollView
            className="flex-1 px-5 pt-4"
            contentContainerClassName="gap-3 pb-3"
            showsVerticalScrollIndicator={false}>
            {turns.map(turn => (
              <View key={turn.turn_id} className="gap-2">
                <ChatBubble align="right" text={turn.learner_text} />
                <ChatBubble align="left" text={turn.persona_text} />
              </View>
            ))}
          </ScrollView>

          <View className="flex-row items-center gap-2 border-t border-brand-border px-5 py-3 dark:border-brandDark-border">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Nhập điều bạn muốn nói..."
              placeholderTextColor={colors.meta}
              className="flex-1 rounded-full border border-brand-border px-4 py-[10px] text-[15px] text-brand-ink dark:border-brandDark-border dark:text-brandDark-ink"
              editable={!sending && !!session}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Gửi"
              onPress={handleSend}
              disabled={sending || !session || !draft.trim()}
              className="h-11 w-11 items-center justify-center rounded-full bg-brand-accent disabled:opacity-40 dark:bg-brandDark-accent">
              <Send size={18} color="#ffffff" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

/** Renders the first remote video track published into the room — the HeyGen avatar stream. */
function AvatarStage() {
  const tracks = useTracks([Track.Source.Camera, Track.Source.Unknown]);
  const videoTrack = tracks.find(track => track.publication?.kind === 'video');

  if (!videoTrack) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }

  return <VideoTrack trackRef={videoTrack} style={{ flex: 1 }} />;
}

function ChatBubble({ align, text }: { align: 'left' | 'right'; text: string }) {
  if (!text) {
    return null;
  }
  const isRight = align === 'right';
  return (
    <View className={isRight ? 'items-end' : 'items-start'}>
      <View
        className={
          isRight
            ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-brand-accent px-4 py-2 dark:bg-brandDark-accent'
            : 'max-w-[80%] rounded-2xl rounded-bl-sm bg-brand-surface px-4 py-2 dark:bg-brandDark-surface'
        }>
        <Text
          className={
            isRight
              ? 'text-[14px] text-white'
              : 'text-[14px] text-brand-ink dark:text-brandDark-ink'
          }>
          {text}
        </Text>
      </View>
    </View>
  );
}
