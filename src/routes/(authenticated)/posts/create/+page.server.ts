import type { Actions, PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const schema = z.object({
  title: z.string().max(50, { message: "50文字以内で入力してください" }).refine(value => value.trim() !== "", { message: "入力必須項目です" }),
  body: z.string().max(10000, { message: "10000文字以内で入力してください" }).refine(value => value.trim() !== "", { message: "入力必須項目です" }),
  user_id: z.string().refine(value => value.trim() !== "", { message: "user_idは入力必須項目です" }),
});

export const load: PageServerLoad = async (event) => {
  const { session } = await event.parent();
  const form = await superValidate(zod(schema));

  if (!session) {
    redirect(307, "/login");
  }

  return {
    form,
    session,
  };
};

export const actions = {
  default: async ({ fetch, request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }
    
    const title = form.data.title
    const body = form.data.body
    const user_id = form.data.user_id

    let errors;

    try {
      const res = await fetch(`${API_URL}/v1/posts`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, user_id }),
      });
      if (!res.ok) {
        errors = await res.json();
        console.log(errors);
        throw new Error(errors);
      }
    } catch (error) {
      console.log(error)
    }

    if (errors) {
      return fail(400, { title, body, user_id, errors });
    }

    redirect(303, "/");
  }
} satisfies Actions;