import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  let { data: customers, error: customersError } = await supabase
    .from("customers")
    .select(`*, orders (id)`);

  if (customersError) {
    console.log("🚀 ~ load:PageServerLoad ~ customersError:", customersError);
    customers = [];
  }

  return {
    customers,
  };
};
