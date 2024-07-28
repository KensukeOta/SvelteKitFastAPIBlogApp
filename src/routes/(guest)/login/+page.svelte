<script lang="ts">
  import OAuthMenu from "$lib/components/molecules/OAuthMenu/OAuthMenu.svelte";
</script>

<svelte:head>
	<title>ログインフォーム | SvelteFastAPIBlogApp</title>
</svelte:head>

<div class="h-full flex flex-col items-center justify-center gap-2 text-center">
  <div class="h-full flex flex-col items-center justify-center gap-2 bg-white w-80 px-8 py-5">
    <OAuthMenu />
  </div>
</div>