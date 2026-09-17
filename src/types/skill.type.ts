export type SkillLevelBand = {
  level: number;
  title: string;
  description: string;
  /** Decimal-as-string (Postgres Decimal column) — parseFloat before doing math. */
  scoreMin: string;
  scoreMax: string;
};

/** Shape returned by GET /api/skills — the durable, per-skill source of truth. */
export type Skill = {
  id: string;
  code: string;
  name: string;
  competencyCode: string | null;
  locked: boolean;
  /** Null until measured. Decimal-as-string (Postgres Decimal column) — parseFloat before doing math. */
  currentScore: string | null;
  /** Null until measured. */
  currentLevel: number | null;
  sessionsDone: number;
  sessionsTotal: number;
  levels: SkillLevelBand[];
};
