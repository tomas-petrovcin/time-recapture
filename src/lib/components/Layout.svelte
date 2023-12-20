<script lang="ts">
  import { Timeline, List } from '$lib/components';
</script>

<div class="wrapper">
  <div class="sidebar">
    <h1>Time Recapture</h1>
    <p>
      Time Recapture is a game about time travel. You are a time traveler who has lost their memory.
      You must travel through time to recover your memories.
      <span class="caption">- GitHub Copilot</span>
    </p>

    <List />
  </div>
  <div class="content">
    <Timeline />
  </div>
</div>

<style>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    flex-direction: row;
    display: flex;
    flex: 1;
  }

  .sidebar {
    margin: var(--spacing-l) var(--spacing-l);
    padding: var(--spacing-l);
    margin-right: 0;
    border-radius: var(--radius-m);

    background: var(--background-light);

    backdrop-filter: blur(10px);

    display: flex;
    flex: 1;
    max-width: 384px;
    overflow: clip;
    flex-direction: column;
  }

  .content {
    display: flex;
    flex: 4;
  }

  .caption {
    font-size: 12px;
    font-style: italic;
    color: var(--color-label-secondary);
    white-space: nowrap;
  }
</style>
