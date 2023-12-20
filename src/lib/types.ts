export enum QuestStatus {
  TODO = 'todo',
  SCHEDULED = 'scheduled',
  DONE = 'done',
  DELETED = 'deleted'
}

export type Quest = {
  id: string;
  name: string;
  description?: string;
  reward: string;
  schedule: number;
  status: QuestStatus;
  duration: number; // minutes
};

export enum FocusSection {
  QUESTS = 'quests',
  SCHEDULE = 'schedule',
  SPOTLIGHT = 'spotlight'
}

export type idk = any;
