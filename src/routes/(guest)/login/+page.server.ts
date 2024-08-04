import type { PageServerLoad } from './$types';
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const schema = z.object({
  email: z.string()
    .email("無効なメールアドレスです")
    .refine(value => value.trim() !== "", { message: "入力必須項目です" }),
  password: z.string()
    .refine(value => value.trim() !== "", { message: "入力必須項目です" }),
})

export const load: PageServerLoad = async (event) => {
  const { session } = await event.parent();
  const form = await superValidate(zod(schema));

  if (session) {
    redirect(303, '/');
  }

  return {
    form,
    session,
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

  }
} satisfies Actions;