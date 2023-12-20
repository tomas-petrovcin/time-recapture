import {
  focus,
  setFocus,
  focusNext,
  focusPrevious,
  removeQuest,
  toggleSpotlight,
  scheduleQuest,
  toggleComplete
} from '$lib/store';
import { FocusSection } from '$lib/types';
import { get } from 'svelte/store';

export function keyboardEventHandler(event: KeyboardEvent) {
  if (event.key === 'k' && event.metaKey) {
    toggleSpotlight();
    event.preventDefault();
  }

  if (event.key === 'ArrowLeft') {
    setFocus(FocusSection.QUESTS);
    event.preventDefault();
  }

  if (event.key === 'ArrowRight') {
    setFocus(FocusSection.SCHEDULE);
    event.preventDefault();
  }

  if (event.key === 'ArrowUp') {
    focusPrevious();
    event.preventDefault();
  }

  if (event.key === 'ArrowDown') {
    focusNext();
    event.preventDefault();
  }

  // backspace
  if (event.key === 'Backspace') {
    const focusedQuestId = get(focus).elementId;
    if (!focusedQuestId) return;
    removeQuest(focusedQuestId);
    event.preventDefault();
  }

  // tab
  if (event.key === 'Tab') {
    const focusedQuestId = get(focus).elementId;
    if (!focusedQuestId) return;
    scheduleQuest(focusedQuestId);
    event.preventDefault();
  }

  if (event.key === 'Enter') {
    const focusedQuestId = get(focus).elementId;
    if (!focusedQuestId) return;
    toggleComplete(focusedQuestId);
    event.preventDefault();
  }

  // if (event.key === 'z' && event.metaKey && event.shiftKey) {
  //   redo();
  //   event.preventDefault();
  // }

  // if (event.key === 'z' && event.metaKey) {
  //   undo();
  //   event.preventDefault();
  // }
}
