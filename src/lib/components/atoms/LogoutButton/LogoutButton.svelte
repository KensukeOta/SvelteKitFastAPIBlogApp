<script>
	import { page } from "$app/stores";
	import { SignOut } from "@auth/sveltekit/components";
</script>

<SignOut
	signOutPage="logout"
	options={{
		redirectTo: $page.data.redirectTo
			? `/${decodeURIComponent($page.data.redirectTo).slice(1)}`
			: `/login`
	}}
  class="inline-block w-full hover:bg-slate-200 hover:rounded-lg logout"
>
	<span slot="submitButton">ログアウト</span>
</SignOut>
