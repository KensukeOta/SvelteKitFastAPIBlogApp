<script lang="ts">
	import { page } from "$app/stores";
	import PostItem from "$lib/components/organisms/PostItem/PostItem.svelte";
	import DefaultLayout from "$lib/components/templates/DefaultLayout/DefaultLayout.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>SvelteFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-6">
	<p>Welcome {$page.data.session?.user ? $page.data.session.user.name : "stranger"}</p>

	<section class="mt-2">
		{#each data.posts as post (post.id)}
			<PostItem {post} />
		{/each}
	</section>
</DefaultLayout>
