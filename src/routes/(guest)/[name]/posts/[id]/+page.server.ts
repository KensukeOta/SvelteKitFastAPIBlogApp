import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
  const { session } = await parent();
  let post;

  try {
    const res = await fetch(`${API_URL}/v1/posts/${params.id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errrors = await res.json();
      console.log(errrors)
      throw new Error(errrors)
    }
    post = await res.json();
  } catch (error) {
    console.log(error);
  }

  if (params.name !== post.user.name) {
    redirect(303, "/");
  }

  return {
    post,
    session,
  };
};