<script lang="ts">
  import PostForm from "$lib/components/organisms/PostForm/PostForm.svelte";
  import DefaultLayout from "$lib/components/templates/DefaultLayout/DefaultLayout.svelte";
</script>

<svelte:head>
  <title>記事投稿フォーム | SvelteFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-3">
  <PostForm />
</DefaultLayout>
