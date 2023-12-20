<script lang="ts">
  import Checkmark from 'svelte-icons/io/IoMdCheckmark.svelte';
  import { Button } from '$lib';

  export let checked = false;
  export let onChange: (checked: boolean) => void;

  const onClick = () => {
    onChange?.(!checked);
    if (!onChange) checked = !checked;
  };
</script>

<Button onclick={onClick} shortcut={['enter']}>
  <div class="button" class:checked>
    <Checkmark />
  </div>
</Button>

<style>
  .button {
    display: flex;
    flex: 0 auto;
    justify-content: center;
    align-items: center;
    background: transparent;
    aspect-ratio: 1;
    font-size: 1rem;

    & > svg {
      width: 20px;
      height: 20px;
      padding: 0;
    }
  }

  .checked {
    color: var(--color-accent);

    border: none;
  }
</style>
