<script lang="ts">
  import { page } from "$app/stores";
	import LogoutButton from "$lib/components/atoms/LogoutButton/LogoutButton.svelte";
</script>

<div class="absolute top-full right-0">
  <ul class="border bg-white px-2 py-3 text-center rounded-lg w-40 z-50">
    <li>
      <a
        href={`/${$page.data.session?.user?.name}`}
        class="inline-block w-full hover:bg-slate-200 rounded-lg"
      >
        マイページ
      </a>
    </li>
    <li>
      <a
        href="/posts/create"
        class="inline-block w-full hover:bg-slate-200 rounded-lg md:hidden"
      >
        記事を投稿する
      </a>
    </li>
    <hr class="my-4" />
    <li><LogoutButton /></li>
  </ul>
</div>