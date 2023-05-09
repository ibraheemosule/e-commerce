import { ProductType } from "./__store/typesProduct";

export type CmsAllProductsType = {
  data: {
    productCollection: { items: CmsProductType[] };
  };
};

export type CmsProductType = ProductType & { sys: { id: string } };
