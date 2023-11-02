<script lang="ts" context="module">
  import Message from './Message.svelte'
  import "@material/web/button/elevated-button"
</script>

<script lang="ts">
  export let messages: string[]
  export let speaker: string

  export let navigations: { text: string }[]
</script>


<div class="py-2 flex flex-col justify-between  {$$props.class ?? ''}">
  <div class="flex flex-row items-end gap-2" >
    <img class="h-auto w-[10%] object-contain rounded-full" src={speaker} alt="" />
    <div class="flex flex-col gap-2">
      {#each messages as message}
        <Message class="max-w-[25rem] " {message}/>
      {/each}
    </div>
  </div>
  <div class="flex flex-row justify-evenly">
    {#each navigations as navi}
      <!-- TODO: Add back glass morphism -->
      <md-elevated-button name="Your Blog" on:click={() => alert('Not Implemented')}>
        <span slot="icon" class="material-icons text-white">send</span>
        <span class="text-white text-base font-bold">Your Blog</span>
      </md-elevated-button>
    {/each}
  </div>
</div>

<style>
  md-elevated-button {
    --md-elevated-button-container-color: theme("colors.love");
    --md-elevated-button-container-shape: theme("borderRadius.DEFAULT");
    --md-elevated-button-label-text-color: theme("colors.white");
  }
</style>
