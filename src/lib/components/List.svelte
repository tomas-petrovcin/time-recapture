<script lang="ts">
  import { quests, setFocus } from '$lib/store';
  import { Button, QuestCard } from '$lib/components';
  import { FocusSection, QuestStatus, type Quest } from '$lib/types';

  function onAdd() {
    setFocus(FocusSection.SPOTLIGHT);
  }

  let items: Quest[] = [];

  $: items = $quests.filter((quest) => quest.status === QuestStatus.TODO);
</script>

<h2>Quests</h2>
<div class="list">
  {#each items as quest, index (quest.id)}
    <QuestCard {quest} {index} />
  {/each}
</div>

<div class="footer">
  <Button classes="btn" shortcut={['meta', 'k']} onclick={onAdd}>ADD</Button>
</div>

<style>
  h2 {
    position: sticky;
    top: 0;
  }

  .footer {
    position: absolute;
    bottom: 0;
    right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: var(--spacing-m) 0;
  }

  .list {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    padding: var(--spacing-m) 0;
    gap: var(--spacing-s);
  }
</style>
