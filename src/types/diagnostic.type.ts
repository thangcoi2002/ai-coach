/** The four ways a user can have their level measured in the diagnostic gate. */
export type GateMethod = 'report' | 'survey' | 'media' | 'role';

/** Steps of the diagnostic gate: the method picker, one step per method, then the result. */
export type DiagnosticStep = 'gate' | GateMethod | 'result';

/**
 * Shared contract for the four measurement steps, so the gate can render whichever
 * one the user picked without knowing anything about it. Each step reports its own
 * `sourceLabel` ("Từ khảo sát nhanh, 15 câu") since only it knows how it measured.
 */
export type MethodStepProps = {
  onBack: () => void;
  onNext: (sourceLabel: string) => void;
};

export type SurveyQuestion = {
  skill: string;
  question: string;
  options: string[];
};

export type RoleScenario = {
  scenario: string;
  person: string;
  initial: string;
};

/** Which assessment report the user says they are uploading. */
export type ReportKind = 'seli' | '360';

/** A report file the gate has finished reading, with the per-skill scores it found. */
export type ReportUpload = {
  fileName: string;
  fileSize: string;
  sourceLabel: string;
  scores: string[];
};

/** A recording the user submitted for the gate to read. */
export type MediaUpload = {
  fileName: string;
  duration: string;
  note: string;
};

export type ResultSkill = {
  name: string;
  level: number;
  /** Level from the previous diagnostic run, if any — drives the "Đo lại" delta line. */
  prev?: number;
  note: string;
  start?: boolean;
};
