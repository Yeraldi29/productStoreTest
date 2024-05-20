import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  let { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*");

  if (categoriesError) {
    console.log("🚀 ~ load:PageServerLoad ~ categoriesError:", categoriesError);
    categories = [];
  }

  return {
    categories,
  };
};

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const amount = data.get("amount");
    const category_id = data.get("category_id");
    const urlImage = data.get("urlImage");

    if (!name) {
      return fail(400, { name, missing: true, inputRequired: "name" });
    }

    if (!description) {
      return fail(400, {
        description,
        missing: true,
        inputRequired: "description",
      });
    }

    if (!price) {
      return fail(400, { price, missing: true, inputRequired: "price" });
    }

    if (!amount) {
      return fail(400, { amount, missing: true, inputRequired: "amount" });
    }

    if (!category_id) {
      return fail(400, {
        category_id,
        missing: true,
        inputRequired: "category_id",
      });
    }

    if (!urlImage) {
      return fail(400, { urlImage, missing: true, inputRequired: "urlImage" });
    }

    const productData = {
      name,
      description,
      price,
      amount,
      category_id,
      image: urlImage,
    };

    const { data: products, error } = await supabase
      .from("products")
      .insert(productData)
      .select('*');

    if (error) {
      console.log("🚀 ~ default: ~ error:", error);
      return fail(422, {
        success: false,
        error: error.message,
      });
    }

    return { success: true };
  },
} satisfies Actions;
