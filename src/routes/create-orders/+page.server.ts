import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  let { data: customers, error: customersError } = await supabase
    .from("customers")
    .select("*");

  let { data: products, error: productsError } = await supabase
    .from("products")
    .select("*");

  if (customersError) {
    console.log("🚀 ~ load:PageServerLoad ~ customersError:", customersError);
    customers = [];
  }

  if (productsError) {
    console.log(
      "🚀 ~ constload:PageServerLoad= ~ productsError:",
      productsError
    );
    products = [];
  }

  return {
    customers,
    products,
  };
};

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const customer_id = data.get("customer_id");
    const product_id = data.get("product_id");
    const date = data.get("date");
    const quantity = data.get("quantity");

    if (!customer_id) {
      return fail(400, {
        customer_id,
        missing: true,
        inputRequired: "customer_id",
      });
    }

    if (!product_id) {
      return fail(400, {
        product_id,
        missing: true,
        inputRequired: "product_id",
      });
    }

    if (!date) {
      return fail(400, { date, missing: true, inputRequired: "date" });
    }

    if (!quantity) {
      return fail(400, { quantity, missing: true, inputRequired: "quantity" });
    }

    const orderData = {
      customer_id,
      date,
    };

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .insert(orderData)
      .select("*");

    if (ordersError) {
      console.log("🚀 ~ default: ~ orderError:", ordersError);
      return fail(422, {
        success: false,
        error: ordersError.message,
      });
    }

    if (orders && orders.length > 0) {
      console.log("🚀 ~ default: ~ orders:", orders);

      const ordersProductsData = {
        product_id,
        order_id: orders[0].id,
        quantity,
      };

      const { data: ordersProducts, error: ordersProductsError } =
        await supabase
          .from("orders_products")
          .insert(ordersProductsData)
          .select("*");

      console.log("🚀 ~ default: ~ ordersProducts:", ordersProducts);
      if (ordersProductsError) {
        console.log(
          "🚀 ~ default: ~ ordersProductsError:",
          ordersProductsError
        );

        return fail(422, {
          success: false,
          error: ordersProductsError.message,
        });
      }
    } else {
      return fail(422, {
        success: false,
        error: "no order created",
      });
    }

    return { success: true };
  },
} satisfies Actions;
