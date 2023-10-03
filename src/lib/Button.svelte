<script lang="ts">
    export let text: string
    export let action: () => void
  </script>
  
  <button
    class="bg-love  border-white text-white bg-opacity-30 glass-morphism p-1 w-fit rounded {$$props.class ?? ''}"
    on:click={action}>
      {text}
</button>
  