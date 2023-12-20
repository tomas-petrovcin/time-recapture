<script lang="ts">
  import { Chasing } from 'svelte-loading-spinners';
  import { formatShortcut } from '$lib/utils';
  import type { EventHandler } from 'svelte/elements';

  export let onclick: EventHandler;
  export let shortcut: string[] = [];
  export let loading = false;
  export let classes = '';
</script>

<button on:click={onclick} {...$$props} class={classes}>
  <slot />
  <span class="shortcut">{formatShortcut(shortcut)}</span>

  {#if loading}
    <Chasing size={14} color="#afafaf" />
  {/if}
</button>

<style>
  button {
    background: var(--background-interactive);
    box-shadow: none;
    border: none;
    border-radius: var(--radius-m);
    display: flex;
    flex: 0 auto;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-s) var(--spacing-m);
    gap: var(--spacing-m);
    color: var(--color-label);
    font-size: var(--font-size-m);
    font-weight: 700;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition:
      background 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  button:hover {
    background: var(--background-interactive-hover);
    transform: scale(1.025);
  }

  .shortcut {
    color: var(--color-label-secondary);
    font-size: var(--font-size-s);
    font-weight: 400;
    margin-left: auto;
  }
</style>
