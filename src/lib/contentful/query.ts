export const allProductsQuery = `
query {
  productCollection {
    items {
      id
      name
      sizes
      gender
      tag
      price
      description
      images
      sys {
        id
      }
    }
  }
} 
`;

export const oneProductQuery = `
 query getProduct($id: String!){
  product(id: $id) {
    id
    name
    sizes
    gender
    tag
    price
    description
    images
    sys {
      id
    }
  }
}
`;
