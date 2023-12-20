import { persisted } from 'svelte-persisted-store';

type Main = {};

const INITIAL_APP: Main = {};

const STORE_KEY = 'main';

export const main = persisted(STORE_KEY, INITIAL_APP);
