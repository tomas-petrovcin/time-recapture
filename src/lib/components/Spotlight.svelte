<script lang="ts">
  import { createQuest } from '$lib/store/quests';
  import { clearFocus, focus } from '$lib/store';
  import { IS_SSR } from '$lib/utils';
  import { onDestroy } from 'svelte';
  import { keyboardEventHandler } from '$lib/utils/keyboardEventHandler';
  import { FocusSection, type idk } from '$lib/types';

  export let isOpen = false;
  export let value = '';

  function reset() {
    clearFocus();
    value = '';
  }

  function spotlightKeyboardHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      reset();
    }

    if (event.key === 'Enter') {
      value && createQuest(value);
      reset();
    }

    if (event.key === 'k' && event.metaKey) {
      clearFocus();
    }
  }

  $: {
    isOpen = $focus.section === FocusSection.SPOTLIGHT;
  }

  let spotlightRef: idk;

  const handleClickOutside = function (event: MouseEvent) {
    if (!isOpen) return;
    if (spotlightRef && !spotlightRef.contains(event.target)) {
      reset();
    }
  };

  $: {
    if (!IS_SSR) {
      isOpen
        ? document?.addEventListener('click', handleClickOutside, true)
        : document?.removeEventListener('click', handleClickOutside, true);
    }
  }

  onDestroy(() => {
    if (!IS_SSR) {
      document?.removeEventListener('click', handleClickOutside, true);
    }
  });
</script>

<!-- svelte-ignore a11y-autofocus -->
{#if isOpen}
  <div class="overlay">
    <div class="spotlight" bind:this={spotlightRef}>
      <input placeholder="Create a new quest.." class="input" type="text" autofocus bind:value />
    </div>
  </div>
{/if}

<svelte:window on:keydown={isOpen ? spotlightKeyboardHandler : keyboardEventHandler} />

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    flex: 1;

    justify-content: center;
    align-items: flex-start;

    background: rgba(0, 0, 0, 0.5);

    z-index: 100;
  }

  .spotlight {
    border-radius: var(--radius-l);
    padding: var(--spacing-s) var(--spacing-l);
    overflow: hidden;
    width: 500px;
    max-width: 90%;
    margin-top: 25%;
    background: var(--color-accent);
  }

  .input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1.5rem;
    font-family: inherit;
    padding: var(--spacing-s) var(--spacing-m);
    background: transparent;
  }
</style>
