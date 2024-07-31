<script lang="ts">
  import { page } from "$app/stores";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import "github-markdown-css/github-markdown.css";

  let md = $state("# Hello world!");
  const plugins = [gfmPlugin()];
</script>

<form class="h-full">
  <input type="text" name="title" id="title" placeholder="タイトル" class="border p-2 w-full" />

  <div class="flex h-[calc(100%-6.125rem)] mt-2">
    <textarea bind:value={md} name="body" id="body" class="flex-1 bg-gray-200 p-2"></textarea>
    <div class="markdown-body flex-1 p-2">
      <Markdown {md} {plugins} />
    </div>
  </div>

  <input type="hidden" name="user_id" id="user_id" value={$page.data.session?.user?.id} />

  <button type="submit" class="w-full p-2 mt-2 bg-black text-white hover:opacity-70">投稿する</button>
</form>
