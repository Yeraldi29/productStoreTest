<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let data;

  let customers: ICustomers[];
  let products: IProducts[];

  $: customers = data.customers ?? [];
  $: products = data.products ?? [];

  export let form;

  const handleSubmit: SubmitFunction = async ({ formData }) => {};
</script>

<div class="container px-6 py-10 mx-auto">
  <h1 class="text-3xl font-semibold capitalize lg:text-4xl mb-8">
    Create order
  </h1>
  <form
    use:enhance={handleSubmit}
    method="POST"
    enctype="multipart/form-data"
    class=" flex flex-col space-y-4 border-2 border-white p-4 rounded-xl max-w-3xl"
  >
    <div class="flex flex-col space-y-3">
      <label for="customer_id" class="text-xl">Choose a customer</label>
      <select name="customer_id" class="bg-gray-800 p-2 rounded-lg">
        <option value="">Select an option</option>
        {#each customers as customer}
          <option value={customer.id}>{customer.name}</option>
        {/each}
      </select>
      {#if form?.inputRequired === "customer_id"}
        <p class="text-red-400 font-semibold">The customer field is required</p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="product_id" class="text-xl">Choose a product</label>
      <select name="product_id" class="bg-gray-800 p-2 rounded-lg">
        <option value="">Select an option</option>
        {#each products as products}
          <option value={products.id}>{products.name}</option>
        {/each}
      </select>
      {#if form?.inputRequired === "product_id"}
        <p class="text-red-400 font-semibold">The product field is required</p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="date" class="text-xl">Date</label>
      <input
        class="bg-gray-600 rounded-lg w-full h-8 px-2"
        type="date"
        name="date"
      />
      {#if form?.inputRequired === "date"}
        <p class="text-red-400 font-semibold">The date field is required</p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="quantity" class="text-xl">Quantity</label>
      <input
        class="bg-gray-600 rounded-lg w-full h-8 px-2"
        type="number"
        name="quantity"
      />
      {#if form?.inputRequired === "amount"}
        <p class="text-red-400 font-semibold">The quantity field is required</p>
      {/if}
    </div>
    <button type="submit" class="bg-black p-4 w-fit rounded-lg text-xl"
      >Create order</button
    >
  </form>
</div>
