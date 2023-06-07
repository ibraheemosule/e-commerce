import { useMemo } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { ProductType } from "../../../../utils/ts-types/__store/typesProduct";
import { tags } from "../../../../utils/utilsData";

export const useOneProductPerTag = () => {
  const { immutableProducts } = useAppSelector(({ product }) => product);

  const oneProductPerTag = useMemo(() => {
    const products = [] as ProductType[];
    tags.forEach((tag) => {
      const product = immutableProducts.find((prod) => prod.tag === tag);
      if (product) {
        products.push(product);
      }
    });
    return products;
  }, [immutableProducts]);

  return oneProductPerTag;
};
