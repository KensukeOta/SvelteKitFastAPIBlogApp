<script lang="ts">
	import type { Post } from "$lib/types/Post";

  let { post }: { post: Post } = $props();
</script>

<a href={`/${post.user.name}/posts/${post.id}/edit`} class="text-green-500">更新</a>
