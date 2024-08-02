<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import "github-markdown-css/github-markdown.css";
  import { superForm } from "sveltekit-superforms";
  import DefaultLayout from "$lib/components/templates/DefaultLayout/DefaultLayout.svelte";

  let { data } = $props();
  
  const { form, errors, constraints, message, enhance, submitting } = superForm(data.form);
  const plugins = [gfmPlugin()];
</script>

<svelte:head>
  <title>記事更新フォーム | SvelteKitFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-3">
  <form class="h-full" method="POST" use:enhance>
    <div id="create-error" aria-live="polite" aria-atomic="true">
      {#if $message}
        <p class="text-red-500">
          {$message}
        </p>
      {/if}
    </div>

    <div id="title-error" aria-live="polite" aria-atomic="true">
      {#if $errors.title}
        <p class="text-red-500">
          {$errors.title}
        </p>
      {/if}
    </div>
    <input 
      type="text" 
      name="title" 
      id="title"
      aria-invalid={$errors.title ? 'true' : undefined}
      bind:value={$form.title}
      {...$constraints.title}
      placeholder="タイトル" 
      class="border p-2 w-full" 
    />

    <div id="body-error" aria-live="polite" aria-atomic="true">
      {#if $errors.body}
        <p class="text-red-500">
          {$errors.body}
        </p>
      {/if}
    </div>
    <div class="flex h-[calc(100%-6.125rem)] mt-2">
      <textarea 
        name="body" 
        id="body"
        aria-invalid={$errors.body ? 'true' : undefined}
        bind:value={$form.body}
        {...$constraints.body}
        class="flex-1 bg-gray-200 p-2"
      ></textarea>
      <div class="markdown-body flex-1 p-2">
        <Markdown md={$form.body} {plugins} />
      </div>
    </div>

    <input type="hidden" name="user_id" id="user_id" value={data.post.user_id} />
    <div id="user-id-error" aria-live="polite" aria-atomic="true">
      {#if $errors.user_id}
        <p class="text-red-500">
          {$errors.user_id}
        </p>
      {/if}
    </div>

    <button type="submit" disabled={$submitting} class="w-full p-2 mt-2 bg-black text-white hover:opacity-70">投稿する</button>
  </form>
</DefaultLayout>
