<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import "github-markdown-css/github-markdown.css";
	import UserIcon from "$lib/components/atoms/UserIcon/UserIcon.svelte";
	import DefaultLayout from '$lib/components/templates/DefaultLayout/DefaultLayout.svelte';

  let { data } = $props();

  const plugins = [gfmPlugin()];
</script>

<svelte:head>
  <title>{data.post.title} | SvelteKitFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-12">
  <section class="h-full bg-white px-4 py-6">
    <h1 class="font-bold text-3xl">{data.post.title}</h1>
    <p class="flex mt-2 text-base">by <UserIcon user={data.post.user} className="inline-block border object-cover rounded-full w-6 h-6" />{data.post.user.name}</p>

    <div class="mt-12">
      <div class="markdown-body">
        <Markdown md={data.post.body} {plugins} />
      </div>
    </div>
  </section>
</DefaultLayout>