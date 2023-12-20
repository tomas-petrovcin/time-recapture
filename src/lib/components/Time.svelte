<script lang="ts">
  import { formatTime } from '$lib/utils/index.js';

  let time = new Date();

  // update the time every second
  setInterval(() => {
    time = new Date();
  }, 1000);
</script>

<div class="wrapper">
  <span class="time">{formatTime(time)}</span>
</div>

<style>
  .wrapper {
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    padding: var(--spacing-s) var(--spacing-m);
    border-radius: var(--radius-s);
    background-color: var(--background-translucent);
  }

  .time {
    font-size: 10rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
  }
</style>
