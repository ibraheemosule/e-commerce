import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { memo, useMemo, useState, FC, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";
import Quantity from "../../../others/quantity/Quantity";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  mutateCartList,
  resetProductsList,
  mutateProductsList,
  removeFromCartList,
} from "../../../../store/features/product/product-slice";
import Link from "next/link";
import { useRouter } from "next/router";
import TagBtn from "../../../others/btn/tag-btn/TagBtn";

const CartProductCard: FC<CartProductCardProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { immutableProducts, cartList } = useAppSelector(
    (state) => state.product
  );
  const cart = cartList.filter((prod) => prod.productId === id)[0];
  const [quantity, setQuantity] = useState(cart.quantity ?? 1);

  const removeFromCart = () => dispatch(removeFromCartList(cart));

  useEffect(() => {
    dispatch(mutateCartList({ ...cart, quantity }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const product = useMemo(() => {
    return immutableProducts.filter((prod) => prod.id === id)[0];
  }, [id, immutableProducts]);

  const filterProductsList = async (obj: Record<string, string>) => {
    if (obj["size"]) return;
    dispatch(resetProductsList());
    dispatch(mutateProductsList(obj));
    await router.push("/products");
  };

  const filters = {
    genderValue: product.gender,
    filterValue: product.tag,
    size: cart.size,
  };

  return (
    <>
      <Grid
        item
        columnGap={{ xs: 1.5, sm: 4 }}
        rowGap={2}
        xs={12}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 6,
          mb: { xs: 0, md: 0 },
        }}
      >
        <Box>
          <Image
            src={product.images[0]}
            alt={`${product.name}`}
            width={100}
            height={100}
            quality={25}
            style={{ objectFit: "cover" }}
          />
          <Box sx={{ mt: 1 }}>
            <Button
              onClick={removeFromCart}
              sx={{
                color: "secondary.main",
                p: 0,
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
              startIcon={<DeleteOutlineIcon />}
            >
              Remove
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexGrow: 1,
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h6"
              fontWeight="400"
              color="secondary.main"
            >
              <Link
                href={`/product?id=${id}`}
                style={{ all: "unset", display: "block", cursor: "pointer" }}
              >
                {product.name}
              </Link>
            </Typography>
            <Box sx={{ mt: 1 }}>
              {Object.entries(filters).map(
                ([key, value]) =>
                  value && (
                    <TagBtn
                      text={value}
                      onClick={() =>
                        void filterProductsList({ [key]: value.toString() })
                      }
                      key={value}
                      disabled={key === "size"}
                    />
                  )
              )}
              <Box sx={{ mt: 2 }}>
                <Quantity quantity={quantity} setQuantity={setQuantity} />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              component="h2"
              variant="h6"
              fontWeight="400"
              color="primary.dark"
            >
              &#8358;{(quantity * product.price).toFixed(2).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} my={2} sx={{ display: "block" }}>
        <Divider />
      </Grid>
    </>
  );
};

interface CartProductCardProps {
  id: string;
}

export default memo(CartProductCard);
