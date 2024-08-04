import type { PageServerLoad } from './$types';
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const { session } = await event.parent();

  if (session) {
    redirect(303, '/');
  }

  return {
    session,
  };
};

export const actions = {
  
} satisfies Actions;