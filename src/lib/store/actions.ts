import { persisted } from 'svelte-persisted-store';
import type { Quest } from '$lib/types';

// command history to support undo/redo

const STORE_KEY = 'actions';

export const actions = persisted(STORE_KEY, [] as Quest[]);
