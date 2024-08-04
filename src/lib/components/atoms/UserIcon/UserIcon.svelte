<script lang="ts">
	import type { User } from "$lib/types/User";
  import { page } from "$app/stores";

  let { user, alt = "User Image", className = "inline-block border object-cover rounded-full w-9 h-9" }: {user: User, alt?: string, className?: string} = $props();
</script>

{#if user.image}
  <enhanced:img 
    src={user?.image || "$lib/images/noavatar.jpeg"}
    alt={alt}
    class={className}
  />
{:else}
  <enhanced:img
    src={"/noavatar.jpeg" || user?.image}
    alt={alt}
    class={className}
  />
{/if}
