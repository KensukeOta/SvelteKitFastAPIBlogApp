<script lang="ts">
  import type { Post } from "$lib/types/Post";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from "$app/forms";

  let { post }: { post: Post } = $props();

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    if (!confirm("この記事を削除しますか？")) {
      cancel();
    }
  };
</script>

<form method="POST" action="/?/delete" class="inline-block" use:enhance={handleSubmit}>
  <input type="hidden" name="post" value={post.id} />
  <button type="submit" class="text-red-500">削除</button>
</form>