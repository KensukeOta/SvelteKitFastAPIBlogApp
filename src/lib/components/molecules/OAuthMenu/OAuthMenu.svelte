<script lang="ts">
  import { SignIn } from "@auth/sveltekit/components";
</script>

<SignIn 
  provider="google" 
  signInPage="login"
>
  <span slot="submitButton" class="flex items-center justify-center gap-2 px-4 py-3 border rounded-lg w-full hover:bg-blue-300">Googleでログイン</span>
</SignIn>

<SignIn 
  provider="github" 
  signInPage="login"
>
  <span slot="submitButton" class="flex items-center justify-center gap-2 px-4 py-3 border rounded-lg w-full hover:bg-blue-300">GitHubでログイン</span>
</SignIn>