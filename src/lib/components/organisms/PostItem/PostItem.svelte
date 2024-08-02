<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import { page } from "$app/stores";
	import PostEditLinkButton from "$lib/components/atoms/PostEditLinkButton/PostEditLinkButton.svelte";

	let { post }: { post: Post } = $props();
</script>

<article class="bg-white border p-2">
	<h2 class="font-bold text-left">
		<a href={`/${post.user.name}/posts/${post.id}`} class="inline-block w-full hover:underline">
			{post.title}
		</a>
	</h2>

	<nav class="flex justify-between">
		<p>by {post.user.name}</p>
		{#if $page.data.session?.user && $page.data.session.user.id === post.user_id}
			<PostEditLinkButton {post} />
		{/if}
	</nav>
</article>
