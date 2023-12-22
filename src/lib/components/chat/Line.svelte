<script lang="ts">
  export let sender: 'addresser' | 'addressee'

  $: alignment = {
    addressee: {
      justify: 'justify-start',
      items: 'items-start',
    },
    addresser: {
      justify: 'justify-end',
      items: 'items-end',
    },
  }[sender]
</script>

<div
  class="
  flex flex-row gap-2 {alignment.justify} items-end
  {$$props['class'] ?? ''}">
  <slot name="avatar" />
  <div class="flex flex-col gap-2 {alignment.items}">
    <slot />
  </div>
</div>
