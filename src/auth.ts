import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import GitHub from "@auth/sveltekit/providers/github";
import { API_URL } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Google,
    GitHub,
  ],

  callbacks: {
    async signIn({ user, account }) {
      const name = user.name;
      const email = user.email;
      const image = user.image;
      const provider = account?.provider;

      try {
        const res = await fetch(`${API_URL}/v1/oauth`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, image, provider }),
        });
        if (!res.ok) {
          const errors = await res.json();
          console.log(errors);
          throw new Error(errors);
        } else {
          return true
        }
      } catch (error) {
        console.log(error);
        return false
      }
    }
  },

  pages: {
    signIn: "/login"
  },
});