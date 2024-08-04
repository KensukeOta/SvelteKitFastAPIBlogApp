<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { superForm } from "sveltekit-superforms";
	import OAuthMenu from "$lib/components/molecules/OAuthMenu/OAuthMenu.svelte";
	import DefaultLayout from "$lib/components/templates/DefaultLayout/DefaultLayout.svelte";

	let { data } = $props();

  let error = $state("");
  
  const { form, errors, constraints, message, enhance, submitting } = superForm(data.form, {
    resetForm: false,
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    await signIn("credentials", { email: $form.email, password: $form.password });
  }
</script>

<svelte:head>
	<title>ログインフォーム | SvelteKitFastAPIBlogApp</title>
</svelte:head>

<DefaultLayout className="py-4">
	<div class="h-full flex flex-col items-center justify-center gap-2 text-center">
		<div class="h-full flex flex-col items-center justify-center gap-2 bg-white w-80 px-8 py-5">
      <form method="POST" onsubmit={handleSubmit} class="w-full" use:enhance>
        <div id="create-error" aria-live="polite" aria-atomic="true">
          {#if error}
            <p class="text-red-500">
              {error}
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

        <button type="submit" disabled={$submitting} class="w-full p-2 mt-2 bg-black text-white hover:opacity-70">ログイン</button>
      </form>

      <div>
        <span class="text-xs">アカウントをお持ちではないですか？</span>
        <a href="/signup" class="text-xs text-blue-500 hover:opacity-70">新規登録</a>
      </div>
			<OAuthMenu />
		</div>
	</div>
</DefaultLayout>
