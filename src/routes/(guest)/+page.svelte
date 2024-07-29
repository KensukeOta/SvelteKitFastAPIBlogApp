<script lang="ts">
	import { page } from "$app/stores";
	import DefaultLayout from "$lib/components/templates/DefaultLayout/DefaultLayout.svelte";
	
	let word = $state("Hello World!");
</script>

<svelte:head>
	<title>SvelteFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-6">
	<h1>{word}</h1>
	<p>Welcome {$page.data.session?.user ? $page.data.session.user.name : "stranger"}</p>
</DefaultLayout>
