<script lang="ts" context="module">
  import Message from './Message.svelte'
  import "@material/web/button/elevated-button"
</script>

<script lang="ts">
  export let messages: string[]
  export let speaker: string
</script>


<div class="flex flex-row items-end gap-2 {$$props.class ?? ''}" >
  <img class="h-auto w-10 object-contain rounded-full" src={speaker}
    alt="Speaker deliveres welcoming speech" />
  <div class="flex flex-col gap-2">
    {#each messages as message}
      <Message class="max-w-[25rem] " {message}/>
    {/each}
  </div>
</div>
