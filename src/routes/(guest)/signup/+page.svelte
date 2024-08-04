<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import OAuthMenu from "$lib/components/molecules/OAuthMenu/OAuthMenu.svelte";
	import DefaultLayout from "$lib/components/templates/DefaultLayout/DefaultLayout.svelte";

  let { data } = $props();
  
  const { form, errors, constraints, message, enhance, submitting } = superForm(data.form, {
    resetForm: false,
  });
</script>

<svelte:head>
	<title>サインアップフォーム | SvelteKitFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-4">
  <div class="h-full flex flex-col items-center justify-center gap-2 text-center">
    <div class="h-full flex flex-col items-center justify-center gap-2 bg-white w-80 px-8 py-5">
      <form method="POST" class="w-full" use:enhance>
        <div id="create-error" aria-live="polite" aria-atomic="true">
          {#if $message}
            <p class="text-red-500">
              {$message}
            </p>
          {/if}
        </div>
        <label for="name" class="block">名前</label>
        <input 
          name="name" 
          id="name" 
          type="text"
          aria-invalid={$errors.name ? 'true' : undefined}
          bind:value={$form.name}
          {...$constraints.name}
          class="border px-4 py-2 w-full" 
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {#if $errors.name}
            <p class="text-red-500">
              {$errors.name}
            </p>
          {/if}
        </div>

        <label for="email" class="block">メールアドレス</label>
        <input 
          name="email" 
          id="email" 
          type="email"
          aria-invalid={$errors.email ? 'true' : undefined}
          bind:value={$form.email}
          {...$constraints.email}
          class="border px-4 py-2 w-full" 
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {#if $errors.email}
            <p class="text-red-500">
              {$errors.email}
            </p>
          {/if}
        </div>

        <label for="password" class="block">パスワード</label>
        <input 
          name="password" 
          id="password" 
          type="password"
          aria-invalid={$errors.password ? 'true' : undefined}
          bind:value={$form.password}
          {...$constraints.password}
          class="border px-4 py-2 w-full" 
        />
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {#if $errors.password}
            <p class="text-red-500">
              {$errors.password}
            </p>
          {/if}
        </div>

        <label for="password_confirmation" class="block">パスワード確認</label>
        <input 
          name="password_confirmation" 
          id="password_confirmation" 
          type="password" 
          aria-invalid={$errors.password_confirmation ? 'true' : undefined}
          bind:value={$form.password_confirmation}
          {...$constraints.password_confirmation}
          class="border px-4 py-2 w-full" 
        />
        <div id="password_confirmation-error" aria-live="polite" aria-atomic="true">
          {#if $errors.password_confirmation}
            <p class="text-red-500">
              {$errors.password_confirmation}
            </p>
          {/if}
        </div>
        <button type="submit" disabled={$submitting} class="w-full p-2 mt-2 bg-black text-white hover:opacity-70">登録</button>
      </form>

      <div>
        <span class="text-xs mr-1">すでにアカウントをお持ちですか？</span>
        <a href="/login" class="text-xs text-blue-500 hover:opacity-70">ログイン</a>
      </div>
      <OAuthMenu />
    </div>
  </div>
</DefaultLayout>