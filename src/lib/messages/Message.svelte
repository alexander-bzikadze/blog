<script lang="ts">
  export let message: string
</script>

<p
  class="primary-container on-primary-container-text
    w-fit rounded p-1 {$$props.class ?? ''}">
  {message}
</p>
