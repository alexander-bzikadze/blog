<script lang="ts">
  export let message: string
</script>

<p
  class="w-fit rounded
    p-1 primary-container on-primary-container-text {$$props['class'] ?? ''}">
  {message}
</p>
