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
import { updateProductInCart } from "../../../../store/features/product/product-slice";

const CartProductCard: FC<CartProductCardProps> = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { cartList, immutableProducts } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    // const getProductIdInCart = cartList.filter(prod => prod.id === id)
    dispatch(updateProductInCart({ id, quantity }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, id]);

  const product = useMemo(() => {
    return immutableProducts.filter((prod) => prod.id === id)[0];
  }, []);

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
              sx={{ color: "secondary.main", p: 0 }}
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
              {product.name}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Quantity quantity={quantity} setQuantity={setQuantity} />
            </Box>
          </Box>
          <Box>
            <Typography
              component="h2"
              variant="h6"
              fontWeight="400"
              color="primary.dark"
            >
              &#8358;{(quantity * product.price).toLocaleString()}
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
