<script lang="ts">
  import styles from '../styles'

  export let message: string

  export let style: 'primary' | 'secondary' | 'tertiary'
</script>

<p
  class="
    w-fit
    {styles.colors[style].base}
    rounded p-2 font-sans text-base font-medium
    {$$props['class'] ?? ''}">
  {message}
</p>
