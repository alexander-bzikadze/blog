<script lang="ts" context="module">
  import Message from './Message.svelte'
  import Button from "./Button.svelte"
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
      <Button text={navi.text} action={() => alert('Not Implemented')}/>
    {/each}
  </div>
</div>
