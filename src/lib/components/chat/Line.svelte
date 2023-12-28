<script lang="ts">
  export let sender: 'addresser' | 'addressee'
  export let dropDuration: string = '0s'

  $: alignment = {
    addressee: {
      justify: 'justify-start',
      items: 'items-start',
    },
    addresser: {
      justify: 'justify-end',
      items: 'items-end',
    },
  }[sender]
</script>

<div
  style="--animation-duration: {dropDuration};"
  class="
  flex flex-row gap-2 {alignment.justify} items-end
  {$$props['class'] ?? ''}">
  <slot name="avatar" />
  <div
    class="
    flex flex-col gap-2 {alignment.items}
    animate-drop">
    <slot />
  </div>
</div>

<style>
  @keyframes wait {
    from,
    to {
      opacity: 0;
    }
  }
  @keyframes drop {
    from {
      opacity: 0;
      transform: translateY(-100vh);
    }
    to {
      opacity: 1;
    }
  }

  :global(:root:not([data-loaded])) .animate-drop :global(> *) {
    animation:
      wait var(--animation-delay, 0s) ease-in-out,
      drop var(--animation-duration, 0s) ease-in-out var(--animation-delay, 0s);
  }
</style>
