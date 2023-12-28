<script lang="ts">
  export let riseDuration: string = '0s'
</script>

<div class="animate-drop flex justify-end md:justify-center" style="--animation-duration: {riseDuration};">
  <slot />
</div>

<style>
  @keyframes wait {
    from,
    to {
      opacity: 0;
    }
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(100vh);
    }
    to {
      opacity: 1;
    }
  }

  :global(:root:not([data-loaded])) .animate-drop :global(> *) {
    animation:
      wait var(--animation-delay, 0s) ease-in-out,
      rise var(--animation-duration, 0s) ease-in-out var(--animation-delay, 0s);
  }
</style>
