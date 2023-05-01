export const allProductsQuery = `
query {
  productCollection {
    items {
      id
      name
      sizes
      tag
      price
      description
      imagesCollection {
        items {
          url
        }
      }
    }
  }
} 
`;
