import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  let queryProducts = supabase.from("products").select(`*, categories (*)`);

  let categoryId = url.searchParams.get("category_id") ?? "";

  if (categoryId !== "") {
    queryProducts = queryProducts.eq("category_id", categoryId);
  }

  let { data: products, error: productsError } = await queryProducts;
  let { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*");

  if (productsError) {
    console.log("🚀 ~ load:PageServerLoad ~ productsError:", productsError);
    products = [];
  }

  if (categoriesError) {
    console.log("🚀 ~ load:PageServerLoad ~ categoriesError:", categoriesError);
    categories = [];
  }

  return {
    products,
    categories,
  };
};
