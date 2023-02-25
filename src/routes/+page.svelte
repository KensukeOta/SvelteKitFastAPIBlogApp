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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
