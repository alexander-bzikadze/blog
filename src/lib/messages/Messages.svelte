<script context="module" lang="ts">
  import Message from './Message.svelte'
  import '@material/web/button/elevated-button'
</script>

<script lang="ts">
  export let messages: string[]
</script>

<div class="flex flex-row items-end gap-2 {$$props['class'] ?? ''}">
  <div class="icon h-10 w-10">
    <slot name="icon" />
  </div>
  <div class="flex flex-col gap-2">
    {#each messages as message}
      <Message class="max-w-[25rem] " {message} />
    {/each}
  </div>
</div>

<style>
  .icon :global(*) {
    border-radius: 9999px;
    object-fit: contain;
  }
</style>
