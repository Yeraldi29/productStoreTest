import { createClient } from "@supabase/supabase-js";
import type { LayoutLoad} from "./$types";
import { PUBLIC_ANON_KEY, PUBLIC_PROJECT_URL } from "$env/static/public";

export const load: LayoutLoad = async () => {
  const supabase = createClient(PUBLIC_PROJECT_URL, PUBLIC_ANON_KEY);
  
  return { supabase };
};
