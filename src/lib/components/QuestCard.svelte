<script lang="ts">
  import { Button, Checkbox } from '$lib/components';
  import { focus, scheduleQuest, setFocus, toggleComplete } from '$lib/store';
  import { FocusSection, type Quest, QuestStatus } from '$lib/types';
  import Checkmark from 'svelte-icons/io/IoMdCheckmark.svelte';

  export let quest: Quest;
  export let index: number;
  export let layoutHeight: number | undefined;

  let selected = false;

  const onCompletedChange = () => toggleComplete(quest.id);

  $: selected = $focus.elementId === quest.id;

  $: minuteSize = layoutHeight && layoutHeight / 1440;

  $: style = minuteSize
    ? `max-height: ${quest.duration * minuteSize}px;
       top: ${quest.schedule * minuteSize - 2}px;
       position: absolute;
       left: 0;
       right: 0;
       z-index: ${selected ? 100 : 50};`
    : 'max-height: 100px';

  $: compact = !!minuteSize && quest.duration * minuteSize! < 50 && !selected;

  function onFocus() {
    setFocus(quest.schedule ? FocusSection.SCHEDULE : FocusSection.QUESTS, index, quest.id);
  }

  function onSchedule() {
    scheduleQuest(quest.id);
  }
</script>

<div class="wrapper" class:compact class:selected on:click={onFocus} {style}>
  {#if compact}
    <div class="row">
      <h6>{quest.name}</h6>
      {#if quest.status === QuestStatus.DONE}
        <div class="icon">
          <Checkmark />
        </div>
      {/if}
    </div>
  {/if}

  {#if !compact}
    <div class="row">
      <h4>{quest.name}</h4>
      <Checkbox checked={quest.status === QuestStatus.DONE} onChange={onCompletedChange} />
    </div>

    {#if selected}
      <div class="row" class:row={selected}>
        {#if quest.status === QuestStatus.DONE}
          <Button onclick={onSchedule} shortcut={['tab']} />
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;

    justify-content: space-between;

    min-height: 10px;

    gap: var(--spacing-m);
    border: none;
    overflow: hidden;

    padding: var(--spacing-m) var(--spacing-l);
    border-radius: var(--radius-m);
    background-color: var(--background-translucent);
    backdrop-filter: blur(10px);
    /*box-shadow: var(--shadow-l);*/
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .icon {
    color: var(--color-accent);
    height: 16px;
    width: 16px;
  }

  .wrapper:hover {
    background: var(--background-translucent-hover);
    transform: scaleY(1.05);
    transition: transform 0.2s ease-in-out;
  }

  .selected {
    background: var(--background-translucent-selected);
    transform: scaleY(1.025);
    transition: transform 1s ease-in-out;
  }

  .compact {
    display: flex;
    flex: 1;

    padding: var(--spacing-s) var(--spacing-m);
  }
</style>
