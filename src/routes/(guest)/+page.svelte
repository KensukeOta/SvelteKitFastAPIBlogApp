<script lang="ts">
	import { page } from "$app/stores";
	
	let word = $state("Hello World!");
</script>

<svelte:head>
	<title>SvelteFastAPIBlogApp</title>
</svelte:head>

<h1>{word}</h1>
<p>Welcome {$page.data.session?.user ? $page.data.session.user.name : "stranger"}</p>
