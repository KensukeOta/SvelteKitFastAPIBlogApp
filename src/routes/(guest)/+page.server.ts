import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";

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