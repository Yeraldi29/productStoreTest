<script lang="ts">
  import { goto } from "$app/navigation";

  export let data;

  let products: IProducts[] = [];
  let categories: ICategories[] = [];

  $: products = data.products ?? [];
  $: categories = data.categories ?? [];

  let categoryId: string | null = "";

  $: if (categoryId) {
    goto(`?category_id=${categoryId}`);
  }
</script>

<section class="">
  <div class="container px-6 py-10 mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-semibold capitalize lg:text-4xl text-white">
        Product store
      </h1>
      <label for="categories"></label>
      <select
        bind:value={categoryId}
        name="categories"
        class="bg-gray-800 p-2 rounded-lg"
      >
        <option value="">Select an option</option>
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
    </div>

    <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
      {#each products as product}
        <div class="lg:flex">
          <img
            class="object-cover w-full h-56 rounded-lg lg:w-64"
            src={product.image}
            alt=""
          />

          <div class="flex flex-col justify-between py-6 lg:mx-6">
            <h2 class="text-2xl">{product.name}</h2>
            <h3 class="text-xl text-green-300 font-semibold">
              Category: <span class="text-white">{product.categories.name}</span
              >
            </h3>
            <p>{product.description}</p>
            <h3>Price: {product.price}$</h3>
            <h4>Amount: {product.amount}</h4>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
