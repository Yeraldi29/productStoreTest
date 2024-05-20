import type { SupabaseClient } from "@supabase/supabase-js";
import { PUBLIC_PROJECT_URL } from "$env/static/public";

export const uploadImage = async (
  name: string,
  file: File,
  supabase: SupabaseClient
) => {
  let randomArnCode = Math.random().toString(36).slice(2).toLowerCase();
  let fileName = `${randomArnCode}/${name}.jpg`;

  let { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  let url = `${PUBLIC_PROJECT_URL}/storage/v1/object/public/products/${fileName}`;
  if (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    url = "";
  }

  return url;
};
