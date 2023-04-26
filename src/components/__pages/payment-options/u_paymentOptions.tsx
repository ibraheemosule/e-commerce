import {
  CartType,
  ProductType,
} from "../../../utils/ts-types/__store/typesProduct";
import { OrderType } from "../../../utils/ts-types/__store/typesUser";

export const btnWrapperStyles = {
  mt: 3,
  ".pay-btn": {
    all: "unset",
    mx: "auto",
    cursor: "pointer",
    boxSizing: "border-box",
    display: "block",
    padding: "1rem",
    minWidth: { xs: 200, sm: 250 },
    textAlign: "center",
    color: "inherit",
    fontWeight: 500,
    textTransform: "uppercase",
    fontSize: 16,
    backgroundColor: "#fca311",
    transition: "background-color .2s ease-in",

    "&:hover": {
      backgroundColor: "rgb(176, 114, 11)",
    },
  },
};

export const createOrder = (
  cartList: CartType[],
  productsList: ProductType[],
  amount: number
): OrderType => {
  const products = cartList.map((item) => {
    const product = productsList.find((prod) => prod.id === item.productId)!;

    return {
      quantity: item.quantity || 1,
      size: item.size,
      image: product.images[0],
      id: product.id,
      tag: product.tag,
      gender: product.gender,
      name: product.name,
      price: product.price,
    };
  });

  return {
    pastPurchases: products,
    createdAt: new Date().toISOString(),
    amount,
  };
};
