<script lang="ts" context="module">
    import SendIcon from "@material-design-icons/svg/outlined/send.svg"
  </script>
  
<script lang="ts">
    export let text: string
    export let action: () => void
</script>

<button
    class="bg-love  border-white bg-opacity-30 glass-morphism
            w-fit p-2 rounded
            flex justify-center gap-2
            {$$props.class ?? ''}"
    on:click={action}>
    <span class="material-icons text-white">send</span>
    <span class="text-white">{text}</span>
</button>
  