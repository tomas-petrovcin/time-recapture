import { FocusSection, QuestStatus } from '$lib/types';
import { get, writable } from 'svelte/store';
import { quests } from '$lib/store/quests';

type Focus = {
  section: FocusSection | null;
  index?: number;
  elementId?: string;
};

const INITIAL_FOCUS: Focus = {
  section: null
};

export const focus = writable<Focus>(INITIAL_FOCUS);

export function setFocus(section: FocusSection, index?: number, elementId?: string) {
  if (section === FocusSection.SPOTLIGHT) return focus.set({ section });

  if (elementId) return focus.set({ section, index, elementId });

  focus.set({ section });
  focusNext();
}

export function clearFocus() {
  focus.set(INITIAL_FOCUS);
}

export function toggleSpotlight() {
  focus.update((f) => {
    if (f.section === FocusSection.SPOTLIGHT) {
      return INITIAL_FOCUS;
    } else {
      return { section: FocusSection.SPOTLIGHT };
    }
  });
}

export function focusNext() {
  focus.update((f) => {
    if (!f.section) return f;

    let data;

    if (f.section === FocusSection.QUESTS) {
      data = get(quests).filter((q) => q.status === QuestStatus.TODO);
    }

    if (f.section === FocusSection.SCHEDULE) {
      data = get(quests).filter(
        (q) => q.status === QuestStatus.SCHEDULED || q.status === QuestStatus.DONE
      );
    }

    if (!data) return f;

    const index = f.index !== undefined ? f.index + 1 : 0;
    const elementId = data[index]?.id;
    if (!elementId) return f;

    return { section: f.section, index, elementId };
  });
}

export function focusPrevious() {
  focus.update((f) => {
    if (!f.section) return f;

    let data;

    if (f.section === FocusSection.QUESTS) {
      data = get(quests).filter((q) => q.status === QuestStatus.TODO);
    }

    if (f.section === FocusSection.SCHEDULE) {
      data = get(quests).filter(
        (q) => q.status === QuestStatus.SCHEDULED || q.status === QuestStatus.DONE
      );
    }

    if (!data) return f;

    const index = f.index ? f.index - 1 : 0;
    const elementId = data[index]?.id;
    if (!elementId) return f;

    return { section: f.section, index, elementId };
  });
}
