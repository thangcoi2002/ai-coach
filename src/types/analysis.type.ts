/** One row in the "Hội thoại" list — a real conversation the user submitted for analysis. */
export type ConversationStatus = 'done' | 'processing' | 'poorAudio';

export type ConversationListItem = {
  id: string;
  title: string;
  meta: string;
  status: ConversationStatus;
  /** 'done' only: the one-line takeaway shown under the meta row. */
  takeaway?: string;
  /** 'processing' only: 0–1, drives the progress bar. */
  progress?: number;
};

/** A line the diarizer pulled out of the recording, before the user says who is who. */
export type TranscriptLine = {
  time: string;
  speaker: 'p1' | 'p2';
  text: string;
  /** Stage header ("MỞ ĐẦU", "CĂNG LÊN"…) shown just above this line in the report replay. */
  stage?: string;
  /** Set on the line right before a turning point — the report replay inserts that
   * moment's "chuyển hướng" callout right after this line. */
  momentIndex?: number;
};

/** How the user answered when asked who they were talking to / about what. */
export type ContextOption = { key: string; label: string };

export type AnalysisSkillEvidence = {
  you: string;
  react: string;
  note: string;
};

/** One row in the report's "Những mặt được thể hiện" accordion. */
export type AnalysisSkill = {
  key: string;
  name: string;
  /** Second skill this row also covers, e.g. "Phản hồi xây dựng · báo tin xấu". */
  sub?: string;
  /** null when the conversation never created a situation to score this skill. */
  score: number | null;
  text: string;
  why?: string;
  evidence?: AnalysisSkillEvidence;
  /** Indices into `moments` this skill shows up in. */
  relatedMoments?: number[];
};

/** What to try instead, and how it plays out — feeds both the report's moment card
 * and the "Nói lại khoảnh khắc" redo screen. */
export type AnalysisMomentAlt = {
  redo: string;
  why: string;
  newReact: string;
  newState: string;
  oldState: string;
  oldShort: string;
  newShort: string;
  coach: string;
  gap: string;
  adjust: string;
};

/** A turning point in the conversation — replay's shift callouts link here. */
export type AnalysisMoment = {
  /** Short pill on the moment card, e.g. "Chỗ mất nhiều nhất". */
  kick?: string;
  head: string;
  /** The other person's line right before the user's line below. */
  before: string;
  you: string;
  react: string;
  note: string;
  skills: string[];
  alt: AnalysisMomentAlt;
};

export type ReplayEntry =
  | { kind: 'stage'; label: string }
  | { kind: 'turn'; who: string; text: string; isMe: boolean }
  | { kind: 'shift'; label: string; momentIndex: number }
  | { kind: 'outcome'; text: string };

/** Everything the "Kết quả phân tích" report renders, for one analyzed conversation. */
export type AnalysisReport = {
  title: string;
  meta: string;
  score: number;
  overview: string;
  strengthSkill: string;
  strength: string;
  growthSkill: string;
  growth: string;
  themName: string;
  themInitial: string;
  brief: string;
  replay: ReplayEntry[];
  skills: AnalysisSkill[];
  moments: AnalysisMoment[];
  next: { head: string; why: string; time: string; drill: string };
};
