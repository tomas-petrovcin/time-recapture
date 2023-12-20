<script lang="ts">
  import { onMount } from 'svelte';
  import { formatTime } from '$lib/utils';
  import { minutesFromDate } from '$lib/store';
  // @ts-expect-error date-fns broken types
  import { minutesInDay } from 'date-fns/constants';

  export let layoutHeight: number;
  export let time: Date | undefined = undefined;

  const height = 32;

  let timestamp = time || new Date();
  // @ts-expect-error date-fns broken types
  $: markerPosition = (minutesFromDate(timestamp) / minutesInDay) * layoutHeight - height / 2;

  onMount(() => {
    if (time) return;
    const interval = setInterval(() => (timestamp = new Date()), 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="marker" style="top:{markerPosition}px; height:{height}px">
  <span class="time">
    {formatTime(timestamp)}
  </span>
  <div class="line" />
</div>

<style>
  .marker {
    position: absolute;
    display: flex;
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: stretch;
    z-index: 100;
  }

  .line {
    height: 1px;
    display: flex;
    flex: 1;
    background: var(--color-accent);
  }

  .time {
    color: var(--color-accent);
    width: 100px;
  }
</style>
