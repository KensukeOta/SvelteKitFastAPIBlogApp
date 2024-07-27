<script lang="ts">
  import { SignIn } from "@auth/sveltekit/components";
</script>

<svelte:head>
	<title>ログインフォーム | SvelteFastAPIBlogApp</title>
</svelte:head>

<SignIn 
  provider="google" 
  signInPage="login"
>
<span slot="submitButton">Googleでログイン</span>
</SignIn>