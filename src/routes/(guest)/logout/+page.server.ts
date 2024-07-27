import type { Actions } from "./$types";
import { signOut } from "../../../auth";

export const actions = {
  default: signOut
} satisfies Actions;