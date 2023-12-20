import { v4 as uuid } from 'uuid';
import { persisted } from 'svelte-persisted-store';
import { type Quest, QuestStatus } from '$lib/types';
import { get } from 'svelte/store';

// @ts-expect-error - date-fns imports broken
import { isValid } from 'date-fns';

const STORE_KEY = 'quests';

export const quests = persisted(STORE_KEY, [] as Quest[]);

export function createQuest(questName: string) {
  const quest = {
    id: uuid(),
    name: questName,
    description: '',
    reward: '',
    schedule: 0,
    status: QuestStatus.TODO,
    duration: 60
  };

  quests.update((qs) => [...qs, quest]);
}

export function updateQuest(quest: Quest) {
  quests.update((qs) => {
    const index = qs.findIndex((q) => q.id === quest.id);
    qs[index] = quest;
    return qs;
  });
}

export function removeQuest(id: string) {
  quests.update((qs) => {
    const index = qs.findIndex((q) => q.id === id);
    qs[index].status = QuestStatus.DELETED;
    return qs;
  });
}

function roundUpDateToNearest15Mins(date: Date) {
  return date;
}

export function dateFromMinutes(minutes: number) {
  const date = new Date();
  date.setHours(0, minutes, 0, 0);
  return date;
}

export function minutesFromDate(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function scheduleQuest(id: string) {
  const all = get(quests);
  const quest = all.find((q) => q.id === id);
  const scheduledQuests = all.filter((q) => q.status === QuestStatus.SCHEDULED);

  if (!quest) return;

  const lastScheduledQuest = scheduledQuests.pop();
  const endOfLastScheduledQuest = lastScheduledQuest
    ? dateFromMinutes(lastScheduledQuest?.schedule + lastScheduledQuest?.duration)
    : 0;

  const now = new Date();

  console.log(now, endOfLastScheduledQuest);

  if (now > endOfLastScheduledQuest) {
    console.log('now > endOfLastScheduledQuest');
    quest.schedule = minutesFromDate(now);
    // @ts-expect-error - date-fns imports broken
  } else if (isValid(endOfLastScheduledQuest)) {
    quest.schedule = minutesFromDate(endOfLastScheduledQuest as Date);
  }

  if (!quest.schedule) return;

  quest.status = QuestStatus.SCHEDULED;

  updateQuest(quest);
}

export function unscheduleQuest(quest: Quest) {
  quest.status = QuestStatus.TODO;
  quest.schedule = 0;

  updateQuest(quest);
}

export function clearAllQuests() {
  quests.set([]);
}

export function toggleComplete(id: string) {
  quests.update((qs) => {
    const index = qs.findIndex((q) => q.id === id);
    const item = qs[index];
    if (item.status === QuestStatus.TODO || item.status === QuestStatus.DELETED) return qs;
    qs[index].status = item.status === QuestStatus.DONE ? QuestStatus.SCHEDULED : QuestStatus.DONE;
    return qs;
  });
}
