<script lang="ts">
  export let message: string
</script>

<p class="primary-container on-primary-container-text
  p-1 w-fit rounded {$$props.class ?? ''}">
  {message}
</p>
