<script lang="ts">
  import { Marker, QuestCard } from '$lib/components';
  import { quests } from '$lib/store';
  import { type Quest, QuestStatus } from '$lib/types';

  let wrapperHeight = 0;
  $: layoutHeight = wrapperHeight;

  let items: Quest[] = [];

  $: items = $quests.filter(
    (quest) => quest.status === QuestStatus.SCHEDULED || quest.status === QuestStatus.DONE
  );
</script>

<div class="wrapper" bind:clientHeight={wrapperHeight}>
  <div class="background">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(25) as _}
      <div class="backgroundLine" />
    {/each}
  </div>

  <div class="quests">
    {#each items as quest, index}
      <QuestCard {quest} {index} {layoutHeight} />
    {/each}
  </div>

  <Marker {layoutHeight} />
</div>

<style>
  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: var(--spacing-xl);
  }

  .background {
    position: absolute;
    display: flex;
    flex-direction: column;
    flex: 1;
    top: 0;
    left: 120px;
    bottom: 0;
    right: 0;
    justify-content: space-between;
  }

  .backgroundLine {
    max-height: 1px;
    display: flex;
    flex: 1;
    background: var(--color-divider);
    z-index: 0;
  }

  .quests {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    z-index: 1;
    margin-left: 136px;
    margin-right: var(--spacing-m);
  }
</style>
