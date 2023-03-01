import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ fetch, request }) => {
    const values = await request.formData();
    let errors;

    const name = values.get("name");
    const email = values.get("email");
    const password = values.get("password");
    const password_confirmation = values.get("password_confirmation");
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, password_confirmation, created_at, updated_at })
      });
      if (!res.ok) {
        errors = await res.json();
        console.log(errors);
        throw new Error(errors);
      }
    } catch (error) {
      console.log(error);
    }

    if (errors) {
      return fail(400, { name, email, errors });
    }

    throw redirect(303, "/");
  }
};