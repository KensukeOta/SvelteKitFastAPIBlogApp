<script lang="ts">
  import type { Post } from "$lib/types/Post";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { invalidateAll } from "$app/navigation";

  let isSubmitting = $state(false);

  let { post }: { post: Post } = $props();

  const handleSubmit = async (event: SubmitEvent) => {
    if (!confirm("この記事を削除しますか？")) {
      return;
    }
    event.preventDefault();

    isSubmitting = true;

    try {
      const res = await fetch(`${PUBLIC_API_URL}/v1/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        const errors = await res.json();
        throw new Error(errors);
      }
      await invalidateAll();
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting = false;
    }
  };
</script>

<form onsubmit={handleSubmit} class="inline-block">
  <button type="submit" disabled={isSubmitting} class="text-red-500">削除</button>
</form>