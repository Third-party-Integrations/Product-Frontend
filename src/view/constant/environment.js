export const API_SERVICES = "http://localhost:9000/v1/product/";

export const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
];

export const subcategoriesByCategory = {
  electronics: [
    { value: "phones", label: "Phones" },
    { value: "laptops", label: "Laptops" },
    { value: "cameras", label: "Cameras" },
  ],
  clothing: [
    { value: "men", label: "Men's Clothing" },
    { value: "women", label: "Women's Clothing" },
    { value: "kids", label: "Kids' Clothing" },
  ],
  books: [
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
  ],
};
