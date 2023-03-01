<script lang="ts">
	import type { ActionData } from "./$types";
	import SignupForm from "$lib/components/organisms/SignupForm.svelte";

  export let form: ActionData;
</script>

<svelte:head>
  <title>SignupForm - SvelteKitBlogApp</title>
</svelte:head>

<SignupForm name={form?.name ?? ""} email={form?.email ?? ""} errors={form?.errors ?? ""} />