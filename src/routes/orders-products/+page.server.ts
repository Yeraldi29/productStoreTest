import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  let { data: ordersProducts, error: ordersProductsError } = await supabase
    .from("orders_products")
    .select(`*, orders (*), products(*, categories(*))`);
  console.log("🚀 ~ constload:PageServerLoad= ~ ordersProducts:", ordersProducts)

  if (ordersProductsError) {
    console.log(
      "🚀 ~ load:PageServerLoad ~ ordersProductsError:",
      ordersProductsError
    );
    ordersProducts = [];
  }

  return {
    ordersProducts,
  };
};
