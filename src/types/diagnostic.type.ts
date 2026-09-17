/** The four ways a user can have their level measured in the diagnostic gate. */
export type GateMethod = 'report' | 'survey' | 'media' | 'role';

/** Backend's own spelling of the four methods, used by POST /api/diagnosis/intake. */
export type IntakeMethod = 'SELI' | 'SURVEY' | 'RECORDING' | 'ROLEPLAY';

/** Steps of the diagnostic gate: the method picker, one step per method, then the result. */
export type DiagnosticStep = 'gate' | GateMethod | 'result';

/**
 * Shared contract for the four measurement steps, so the gate can render whichever
 * one the user picked without knowing anything about it. Each step reports its own
 * `sourceLabel` ("Từ khảo sát nhanh, 15 câu") since only it knows how it measured.
 * `result` is optional since not every step is wired to the real diagnosis result yet.
 */
export type MethodStepProps = {
  onBack: () => void;
  onNext: (sourceLabel: string, result?: DiagnosisResult) => void;
};

export type SurveyQuestionOption = {
  key: string;
  text: string;
};

/** Shape returned by GET /api/diagnosis/survey/questions. */
export type SurveyQuestion = {
  id: string;
  situation: string;
  question: string;
  options: SurveyQuestionOption[];
  skill: {
    id: string;
    name: string;
    code: string;
  };
  lang: string;
};

/** One answered question, as sent to POST /api/diagnosis/survey/submit — the server
 * looks up the score and skill itself from `questionId`/`optionKey`. */
export type SurveyAnswer = {
  questionId: string;
  optionKey: string;
};

/** One skill's outcome within a diagnosis result. `score` is a decimal-as-string
 * (Postgres Decimal column) — parseFloat it before doing math. */
export type DiagnosisResultSkill = {
  id: string;
  name: string;
  measured: boolean;
  score: string;
  level: number;
  note: string | null;
};

/** Shape returned by GET /api/diagnosis/{intakeId}/result. */
export type DiagnosisResult = {
  intakeId: string;
  method: IntakeMethod;
  completedAt: string;
  startingPoint: {
    skillId: string;
    name: string;
    level: number;
  };
  skills: DiagnosisResultSkill[];
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
