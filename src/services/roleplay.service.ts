import { api } from './api';

export type RoleplayMode = 'TEXT' | 'VOICE' | 'AVATAR';
export type RelationshipGroup = 'MANAGE_UP' | 'PEER_COMMUNICATION' | 'SUBORDINATE_MANAGEMENT';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type CompetencyCode =
  | 'EMOTION_MANAGEMENT'
  | 'ACTIVE_LISTENING'
  | 'EMPATHIC_COMMUNICATION'
  | 'FEEDBACK'
  | 'CONFLICT_RESOLUTION'
  | 'MOTIVATION'
  | 'COACHING';
export type EmotionState = 'NEUTRAL' | 'DEFENSIVE' | 'ANNOYED' | 'LISTENING' | 'OPEN' | 'COOPERATIVE';
export type RoleplaySessionStatus =
  | 'READY'
  | 'ACTIVE'
  | 'ENDING'
  | 'DEBRIEFING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELED'
  | 'EXPIRED';
export type RoleplayFinishReason = 'STOP' | 'SESSION_END' | 'LIMIT_REACHED' | 'CONTENT_FILTERED';
export type RealtimeChannel = 'VOICE' | 'AVATAR';
export type RealtimeTransport = 'WEBRTC' | 'WEBSOCKET';

export type Persona = {
  id: string;
  display_name: string;
  relationship_group: RelationshipGroup;
  communication_style: string;
  triggers: string[];
  goals: string[];
  resistance_level: number;
  avatar_hint?: string | null;
};

export type Scenario = {
  id: string;
  title: string;
  goal: string;
  difficulty: Difficulty;
  target_competencies?: CompetencyCode[];
  context?: string | null;
};

export type SessionLimits = {
  max_duration_seconds: number;
  max_turns: number;
};

export type RoleplaySession = {
  session_id: string;
  source_reference: string;
  mode: RoleplayMode;
  status: RoleplaySessionStatus;
  emotion_state: EmotionState;
  escalation_level: number;
  turn_count: number;
  elapsed_seconds: number;
  limits: SessionLimits;
  debrief_available: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string;
  ended_at?: string | null;
};

export type RoleplayTurn = {
  turn_id: string;
  turn_index: number;
  client_message_id: string;
  learner_text: string;
  persona_text: string;
  emotion_state: EmotionState;
  escalation_level: number;
  finish_reason: RoleplayFinishReason;
  remaining_turns?: number | null;
  remaining_seconds?: number | null;
  created_at: string;
};

export type RealtimeCredentials = {
  token: string;
  session_id: string;
  channel: RealtimeChannel;
  expires_at: string;
  transport: RealtimeTransport;
  /** LiveKit `serverUrl` (wss://...) issued for this session — view-only, cannot drive the persona's speech. */
  endpoint: string;
  fallback: { allowed: boolean; channel?: RealtimeChannel | null };
  ice_servers: Record<string, unknown>[];
};

/**
 * TODO: seed data cho tới khi có màn chọn persona/kịch bản thật (`practice`/`brief`/`persona`).
 * `tenant_id`/`user_id`/persona/scenario lấy từ ví dụ Swagger của AI Gateway dev, các trường
 * bị cắt trong ví dụ được điền lại cho khớp persona "Sếp Vi Mô".
 */
export const DEMO_TENANT_ID = 'org_demo';
export const DEMO_USER_ID_FALLBACK = 'usr_demo';

export const DEMO_PERSONA: Persona = {
  id: 'P01',
  display_name: 'Sếp Vi Mô (The Micromanager)',
  relationship_group: 'MANAGE_UP',
  communication_style:
    'Nói nhanh, hay ngắt lời, thích kiểm soát chi tiết; hỏi dồn dập "đến đâu rồi" và yêu cầu báo cáo thường xuyên trước khi quyết bất cứ việc gì.',
  triggers: [
    'Bị hỏi ngược lại quyết định của mình',
    'Nghe từ "tự quyết" hoặc "không cần duyệt trước"',
    'Deadline trễ dù chỉ một ngày',
  ],
  goals: [
    'Đảm bảo mọi việc trong tầm kiểm soát của mình',
    'Tránh rủi ro/sai sót có thể bị quy trách nhiệm',
  ],
  resistance_level: 4,
  avatar_hint: 'Nam, khoảng 45 tuổi, áo sơ mi công sở, biểu cảm nghiêm nghị',
};

export const DEMO_SCENARIO: Scenario = {
  id: 'S01',
  title: 'Xin thêm quyền tự quyết từ sếp vi mô',
  goal:
    'Thuyết phục sếp giao quyền quyết định một số việc nhỏ mà không cần xin duyệt trước, mà vẫn giữ được niềm tin của sếp.',
  difficulty: 'MEDIUM',
  target_competencies: ['CONFLICT_RESOLUTION', 'ACTIVE_LISTENING', 'MOTIVATION'],
  context:
    'Bạn vừa hoàn thành tốt hai dự án liên tiếp, nhưng sếp vẫn yêu cầu duyệt từng bước nhỏ khiến tiến độ chậm lại.',
};

export const DEMO_FOCUS_COMPETENCIES: CompetencyCode[] = [
  'CONFLICT_RESOLUTION',
  'ACTIVE_LISTENING',
  'MOTIVATION',
];

export const DEMO_LIMITS: SessionLimits = { max_duration_seconds: 900, max_turns: 6 };

/** Backend-to-backend webhook target — client không nhận được callback này, chỉ cần một URL hợp lệ. */
export const DEMO_CALLBACK_URL = 'http://localhost:8001/internal/webhooks/ai-gateway';

export async function createRoleplaySession(
  mode: RoleplayMode,
  userId: string,
): Promise<RoleplaySession> {
  const response = await api.post<{ data: RoleplaySession }>('/v1/roleplay-sessions', {
    context: {
      tenant_id: DEMO_TENANT_ID,
      user_id: userId,
      source_reference: `demo_practice_${Date.now()}`,
    },
    mode,
    persona: DEMO_PERSONA,
    scenario: DEMO_SCENARIO,
    limits: DEMO_LIMITS,
    callback: { url: DEMO_CALLBACK_URL },
    focus_competencies: DEMO_FOCUS_COMPETENCIES,
  });
  return response.data.data;
}

export async function sendRoleplayMessage(sessionId: string, text: string): Promise<RoleplayTurn> {
  const clientMessageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const response = await api.post<{ data: RoleplayTurn }>(
    `/v1/roleplay-sessions/${sessionId}/messages`,
    { client_message_id: clientMessageId, text },
  );
  return response.data.data;
}

export async function issueRealtimeCredentials(
  sessionId: string,
  channel: RealtimeChannel,
): Promise<RealtimeCredentials> {
  const response = await api.post<{ data: RealtimeCredentials }>(
    `/v1/roleplay-sessions/${sessionId}/realtime-credentials`,
    { channel },
  );
  return response.data.data;
}

export async function endRoleplaySession(sessionId: string): Promise<RoleplaySession> {
  const response = await api.post<{ data: RoleplaySession }>(
    `/v1/roleplay-sessions/${sessionId}/end`,
    { reason: 'USER_FINISHED', generate_debrief: false },
  );
  return response.data.data;
}
