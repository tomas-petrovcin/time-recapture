// @ts-expect-error - svelte can't handle modules with .d.ts ?
import { format } from 'date-fns';

export const formatShortcut = (shortcut: string[]) => {
  return shortcut
    .map((key) => {
      switch (key.toLowerCase()) {
        case 'meta':
          return '⌘';
        case 'control':
          return '⌃';
        case 'alt':
          return '⌥';
        case 'shift':
          return '⇧';
        case 'enter':
          return '⏎';
        case 'tab':
          return '⇥';
        default:
          return key.toUpperCase();
      }
    })
    .join(' + ');
};

// @ts-expect-error - svelte can't handle modules with .d.ts ?
export const formatTime = (time: Date) => format(time, 'HH:mm:ss');
