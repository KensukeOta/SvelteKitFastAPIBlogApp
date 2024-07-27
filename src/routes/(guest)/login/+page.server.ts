import type { PageServerLoad } from './$types';
import type { Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import { signIn } from "../../../auth";


export const load: PageServerLoad = async (event) => {
  const { session } = await event.parent();

  if (session) {
    throw redirect(303, '/');
  }

  return {
    session
  };
};

export const actions = {
  default: signIn
} satisfies Actions;