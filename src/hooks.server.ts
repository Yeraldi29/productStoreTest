import { PRIVATE_ANON_KEY, PRIVATE_PROJECT_URL } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createClient(PRIVATE_PROJECT_URL, PRIVATE_ANON_KEY);

  return await resolve(event);
};
