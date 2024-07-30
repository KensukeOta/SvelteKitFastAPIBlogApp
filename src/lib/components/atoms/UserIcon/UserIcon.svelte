<script lang="ts">
	import type { User } from "$lib/types/User";
  import { page } from "$app/stores";

  let { user, alt = "User Image", className = "inline-block border object-cover rounded-full w-9 h-9" }: {user: User, alt?: string, className?: string} = $props();
</script>

<enhanced:img 
  src={user?.image || "$lib/images/noavatar.jpeg"}
  alt={alt}
  class={className}
/>
