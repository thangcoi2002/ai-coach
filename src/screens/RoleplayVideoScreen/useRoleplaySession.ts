import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import {
  createRoleplaySession,
  endRoleplaySession,
  issueRealtimeCredentials,
  sendRoleplayMessage,
  DEMO_USER_ID_FALLBACK,
  type RealtimeCredentials,
  type RoleplaySession,
  type RoleplayTurn,
} from '@/services/roleplay.service';

type Status = 'connecting' | 'ready' | 'error';

/**
 * Screen-scoped session lifecycle (create session → issue realtime credentials → send/receive
 * turns → end). Kept as a plain hook co-located with the screen instead of an app-level context —
 * unlike auth/notifications/settings, this state only ever has one consumer.
 */
export function useRoleplaySession() {
  const { user } = useAuth();
  const [session, setSession] = useState<RoleplaySession | null>(null);
  const [credentials, setCredentials] = useState<RealtimeCredentials | null>(null);
  const [turns, setTurns] = useState<RoleplayTurn[]>([]);
  const [status, setStatus] = useState<Status>('connecting');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const sessionRef = useRef<RoleplaySession | null>(null);
  const endedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    endedRef.current = false;

    (async () => {
      try {
        const createdSession = await createRoleplaySession('AVATAR', user?.id ?? DEMO_USER_ID_FALLBACK);
        if (cancelled) return;
        sessionRef.current = createdSession;
        setSession(createdSession);

        const creds = await issueRealtimeCredentials(createdSession.session_id, 'AVATAR');
        if (cancelled) return;
        setCredentials(creds);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Không thể bắt đầu phiên diễn tập.');
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      if (sessionRef.current && !endedRef.current) {
        endedRef.current = true;
        endRoleplaySession(sessionRef.current.session_id).catch(() => {});
      }
    };
  }, [user?.id]);

  const send = useCallback(async (text: string) => {
    if (!sessionRef.current || sending) return;
    setSending(true);
    try {
      const turn = await sendRoleplayMessage(sessionRef.current.session_id, text);
      setTurns(prev => [...prev, turn]);
    } finally {
      setSending(false);
    }
  }, [sending]);

  const end = useCallback(async () => {
    if (!sessionRef.current || endedRef.current) return;
    endedRef.current = true;
    await endRoleplaySession(sessionRef.current.session_id).catch(() => {});
  }, []);

  return { session, credentials, turns, status, error, sending, send, end };
}
