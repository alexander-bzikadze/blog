<script lang="ts">
  import styles from '../styles'

  export let href: string
  export let label: string
  export let icon: string | undefined

  export let style: 'primary' | 'secondary' | 'tertiary'
  export let riseDelay: string = '0s'
</script>

<a
  type="button"
  style="--animation-delay: {riseDelay}"
  class="
  inline-flex items-center gap-2
  {styles.colors[style].base}
  {styles.colors[style].interactive}
  rounded px-5 py-2.5 text-center font-sans text-base font-medium
  {$$props['class'] ?? ''}"
  {href}>
  {#if icon}
    <span class="material-icons" role="img" aria-label="{icon}">
      {icon}
    </span>
  {/if}
  {label}
</a>
