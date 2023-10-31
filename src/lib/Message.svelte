<script lang="ts">
  export let message: string
</script>

<div class="bg-perfect bg-opacity-30 glass-morphism p-1 w-fit rounded {$$props.class ?? ''}">
    <span>{message}</span>
</div>
