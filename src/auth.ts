import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import GitHub from "@auth/sveltekit/providers/github";
import Credentials from "@auth/sveltekit/providers/credentials"
import { API_URL } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const email = credentials.email;
          const password = credentials.password;

          const res = await fetch(`${API_URL}/v1/sessions`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, provider: "credentials" }),
          })
          if (!res.ok) {
            const errors = await res.json();
            console.log(errors);
            throw new Error();
          }
          user = await res.json()
          console.log(user)
          // return user object with the their profile data
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.email = user.email
        token.provider = account?.provider
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const res = await fetch(`${API_URL}/v1/users?email=${encodeURIComponent(token.email as string)}&provider=${encodeURIComponent(token.provider as string)}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        session.user.id = data.id;
      } catch (error) {
        console.log(error);
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      
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