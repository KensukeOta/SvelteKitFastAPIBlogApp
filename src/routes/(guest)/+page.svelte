<script lang="ts">
  import { onMount } from "svelte";
  
  onMount(async () => {
    const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      mode: "cors",
      credentials: "include"
    });
    console.log(await res.json());
  });
</script>

<svelte:head>
  <title>SvelteKitBlogApp</title>
</svelte:head>
