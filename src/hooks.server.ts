import { PUBLIC_ANON_KEY, PUBLIC_PROJECT_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createClient(PUBLIC_PROJECT_URL, PUBLIC_ANON_KEY);

  return await resolve(event);
};
