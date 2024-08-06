import type { Actions, PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, parent }) => {
  const { session } = await parent();
  let posts;
  try {
    const res = await fetch(`${API_URL}/v1/posts`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });
    if (!res.ok) {
      const errors = await res.json();
      throw new Error(errors);
    }
    posts = await res.json();
  } catch (error) {
    console.log(error)
  }
  
  return {
    posts,
    session,
  }
};

export const actions = {
  delete: async ({ fetch, request }) => {
    const data = await request.formData();

    const postId = data.get("post");

    let errors;

    try {
      const res = await fetch(`${API_URL}/v1/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
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
      return fail(400, { postId, errors });
    }

    redirect(303, "/");
  },
} satisfies Actions;