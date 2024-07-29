<script lang="ts">
  let { children, className }: {children: any, className: string} = $props();
</script>

<div class={`bg-gray-100 h-full ${className}`}>
  {@render children()}
</div>