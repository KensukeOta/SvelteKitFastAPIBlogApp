<script lang="ts">
  import { page } from "$app/stores";
	import { SignOut } from "@auth/sveltekit/components";
</script>

<header class="flex justify-between items-center border-b relative">
  <div class="leading-9">
    <button class="px-2 rounded-full hover:bg-gray-200">
      <i class="bi bi-list"></i>
    </button>
    <h1 class="inline-block">
      <a href="/" class="inline-block">
        <enhanced:img
          src="$lib/images/favicon.png"
          alt="Svelte Logo"
          class="inline-block h-6 w-6 object-cover"
        />
      </a>
    </h1>
  </div>

  <button type="button" title="検索" class="absolute w-4 right-0 left-0 mx-auto h-full">
    <i class="bi bi-search"></i>
  </button>

  <nav class="leading-9">
    {#if !$page.data.session?.user}
      <a href="/signup" class="inline-block">新規登録</a>
      <a href="/login" class="inline-block">ログイン</a>
    {:else}
      <SignOut 
        signOutPage="logout"
        options={{
        redirectTo: $page.data.redirectTo
          ? `/${decodeURIComponent($page.data.redirectTo).slice(1)}`
          : `/login`,
        }}
      >
        <span slot="submitButton">ログアウト</span>
      </SignOut>
    {/if}
  </nav>
</header>