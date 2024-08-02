<script lang="ts">
	import type { Post } from "$lib/types/Post";

	let { post }: { post: Post } = $props();
</script>

<article class="bg-white border p-2">
	<h2 class="font-bold text-left">
		<a href={`/${post.user.name}/posts/${post.id}`} class="inline-block w-full hover:underline">
			{post.title}
		</a>
	</h2>

	<nav>
		<p>by {post.user.name}</p>
	</nav>
</article>
