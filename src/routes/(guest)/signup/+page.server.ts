import type { Actions, PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(2, { message: "2文字以上で入力してください" })
    .max(50, { message: "50文字以内で入力してください" })
    .refine(value => value.trim() !== "", { message: "入力必須項目です" }),
  email: z.string()
    .email("無効なメールアドレスです")
    .max(254, { message: "254文字以内で入力してください" })
    .refine(value => value.trim() !== "", { message: "入力必須項目です" }),
  password: z.string()
    .min(8, "8文字以上で入力してください")
    .max(32, "32文字以内で入力してください")
    .refine(value => value.trim() !== "", { message: "入力必須項目です" }),
  password_confirmation: z.string()
    .refine(value => value.trim() !== "", { message: "入力必須項目です" }),
}).superRefine((data, ctx) => {
  if (data.password !== data.password_confirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "パスワードが一致しません",
      path: ["password_confirmation"], // エラーメッセージを表示するフィールド
    });
  }
});

export const load: PageServerLoad = async (event) => {
  const { session } = await event.parent();
  const form = await superValidate(zod(schema));

  if (session) {
    redirect(303, "/");
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

    const name = form.data.name
    const email = form.data.email
    const password = form.data.password
    const password_confirmation = form.data.password_confirmation

    let errors;

    try {
      const res = await fetch(`${API_URL}/v1/users`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, password_confirmation, provider: "credentials" }),
      });
      if (!res.ok) {
        errors = await res.json();
        console.log(errors);
        throw new Error(errors.detail);
      }
    } catch (error: any) {
      console.log(error)
      return message(form, error.message);
    }

    if (errors) {
      return fail(400, { name, email, errors });
    }

    redirect(303, "/");
  }
} satisfies Actions;