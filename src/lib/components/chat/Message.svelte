<script lang="ts">
  import styles from '../styles'

  export let message: string

  export let style: 'primary' | 'secondary' | 'tertiary'
  export let dropDelay: string = '0s'
</script>

<p
  style="--animation-delay: {dropDelay};"
  class="
    w-fit
    {styles.colors[style].base}
    rounded p-2 font-sans text-base font-medium
    {$$props['class'] ?? ''}"
  on:animationend>
  {message}
</p>
