import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Google,
    GitHub,
  ],

  pages: {
    signIn: "/login"
  },
});