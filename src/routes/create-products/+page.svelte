<script lang="ts">
  import { enhance } from "$app/forms";
  import { uploadImage } from "$lib/utils/bucket.js";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let data;
  export let form;

  $: categories = data.categories ?? [];

  let categoryId: string | null = "";
  let fileInput: File;
  let name: string;

  const handleSubmit: SubmitFunction = async ({ formData }) => {
    const urlImage = await uploadImage(name, fileInput, data.supabase);

    formData.append("urlImage", urlImage);
  };

  const handleFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    let file = target.files ? target.files[0] : null;
    if (file) {
      fileInput = file;
    }
  };
</script>

<div class="container px-6 py-10 mx-auto">
  <h1 class="text-3xl font-semibold capitalize lg:text-4xl mb-8">
    Create product
  </h1>
  <form
    use:enhance={handleSubmit}
    method="POST"
    enctype="multipart/form-data"
    class=" flex flex-col space-y-4 border-2 border-white p-4 rounded-xl max-w-3xl"
  >
    <div class="flex flex-col space-y-3">
      <label for="name" class="text-xl">Name</label>
      <input
        class="bg-gray-600 rounded-lg w-full h-8 px-2"
        type="text"
        name="name"
        bind:value={name}
      />
      {#if form?.inputRequired === "name"}
        <p class="text-red-400 font-semibold">The name field is required</p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="description" class="text-xl">Description</label>
      <textarea
        class="bg-gray-600 rounded-lg w-full h-16 p-2"
        name="description"
      ></textarea>
      {#if form?.inputRequired === "description"}
        <p class="text-red-400 font-semibold">
          The description field is required
        </p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="price" class="text-xl">Price</label>
      <input
        class="bg-gray-600 rounded-lg w-full h-8 px-2"
        type="number"
        name="price"
        step=".01"
      />
      {#if form?.inputRequired === "price"}
        <p class="text-red-400 font-semibold">The price field is required</p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="amount" class="text-xl">Amount</label>
      <input
        class="bg-gray-600 rounded-lg w-full h-8 px-2"
        type="number"
        name="amount"
      />
      {#if form?.inputRequired === "amount"}
        <p class="text-red-400 font-semibold">The amount field is required</p>
      {/if}
    </div>
    <div class="flex flex-col space-y-3">
      <label for="image" class="text-xl">Image</label>
      <div
        class="flex w-full items-center justify-center bg-grey-lighter text-black"
      >
        <label
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            class="hidden"
            name="image"
            on:input={(e) => handleFile(e)}
          />
        </label>
        {#if form?.inputRequired === "urlImage"}
          <p class="text-red-400 font-semibold">The image field is required</p>
        {/if}
      </div>
    </div>

    <div class="flex flex-col space-y-3">
      <label for="category_id" class="text-xl">Choose a category</label>
      <select
        bind:value={categoryId}
        name="category_id"
        class="bg-gray-800 p-2 rounded-lg"
      >
        <option value="">Select an option</option>
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
      {#if form?.inputRequired === "category_id"}
        <p class="text-red-400 font-semibold">The category field is required</p>
      {/if}
    </div>
    <button type="submit" class="bg-black p-4 w-fit rounded-lg text-xl"
      >Create product</button
    >
  </form>
</div>
