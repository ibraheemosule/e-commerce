import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { Children, memo, useEffect, useState } from "react";
import Image from "next/image";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { CustomDivider as Divider } from "./u_product";
import SelectField from "../../others/select-field/SelectField";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Quantity from "../../others/quantity/Quantity";
import Btn from "../../others/btn/Btn";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { mutateCartList } from "../../../store/features/product/product-slice";
import { nanoid } from "@reduxjs/toolkit";

const Product = () => {
  const [showDescription, setShowDescription] = useState(false),
    [quantity, setQuantity] = useState(1),
    [size, setSize] = useState(""),
    [error, setError] = useState(""),
    [selectedImg, setSelectedImg] = useState("");
  const { immutableProducts, cartList } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ids = cartList.map((prod) => prod.id);
  const id = router.query.id as string;

  const product = immutableProducts.filter((prod) => prod.id === id)[0];

  const addToCart = () => {
    if (product.sizes && !size) {
      setError("Select a Size");
      return;
    }
    const findProduct = cartList.filter(
      (prod) => prod.id === id && prod.size === size
    )[0];
    if (findProduct) {
      dispatch(
        mutateCartList({
          ...findProduct,
          quantity: Number(findProduct.quantity) + quantity,
        })
      );
      return;
    }
    if (product.sizes) {
      console.log(quantity);
      dispatch(mutateCartList({ id, uid: nanoid(), size, quantity }));
    } else dispatch(mutateCartList({ id, uid: nanoid(), quantity }));
  };

  useEffect;

  useEffect(() => {
    setSelectedImg(product?.images[0]);
  }, [product?.images]);

  if (!product) {
    return <div></div>;
  }

  return (
    <>
      <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light" }}>
          <Grid container maxWidth="lg" py={6} rowGap={2}>
            <Grid item xs={12} sm={6} md={7}>
              <Grid container maxWidth="lg" sx={{ overflow: "hidden" }} gap={3}>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  order={{ md: 1 }}
                  sx={{
                    aspectRatio: { xs: "3/2", sm: "1" },
                    position: "relative",
                  }}
                >
                  <Image
                    src={selectedImg}
                    fill
                    sizes="(min-width: 600px) 40vw, 100vw"
                    alt="product"
                    style={{
                      objectFit: "cover",
                      border: "1px solid lightgray",
                      padding: 10,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  order={{ md: 0 }}
                  sx={{ overflow: "hidden" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: { xs: 2 },
                      overflowY: "hidden",
                    }}
                  >
                    {Children.toArray(
                      product?.images.map((img) => (
                        <ButtonBase
                          onClick={() => setSelectedImg(img)}
                          sx={{
                            padding: "4px",
                            border:
                              selectedImg === img ? "2px solid" : "1px solid",
                            borderColor:
                              selectedImg === img
                                ? "secondary.light"
                                : "lightgray",
                            transition: "all .2s ease-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                              borderColor: "transparent",
                            },
                          }}
                        >
                          <Image
                            src={img || ""}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                            alt="product"
                          />
                        </ButtonBase>
                      ))
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={5} color="primary.dark">
              <Typography component="h1" variant="h5" color="secondary.main">
                {product?.name}
              </Typography>
              <Box
                sx={{
                  mt: 0,
                  textTransform: "capitalize",
                  color: "secondary.light",
                }}
              >
                <small
                  style={{
                    border: "1px solid lightgray",
                    padding: ".2rem",
                    marginRight: "15px",
                  }}
                >
                  For {product?.gender}
                </small>
                <small
                  style={{
                    border: "1px solid lightgray",
                    padding: ".2rem",
                  }}
                >
                  {product?.tag}
                </small>
              </Box>
              <Divider />
              <Typography component="h1" variant="h6">
                &#8358;{product?.price}
              </Typography>
              <Typography my={0.5}>
                <strong>Shipping</strong> fee calculated at checkout
              </Typography>
              <Box>
                <ButtonBase
                  onClick={() => setShowDescription((prev) => !prev)}
                  sx={{
                    my: 0.5,
                    fontSize: 16,
                    "& svg": {
                      transition: "transform .2s ease",
                      transform: showDescription ? "rotate(90deg)" : "",
                    },
                  }}
                >
                  <strong>Description</strong> <ArrowRight />
                </ButtonBase>
                <Typography
                  component="p"
                  sx={{
                    color: "primary.dark",
                    display: showDescription ? "block" : "none",
                    fontSize: 13,
                  }}
                >
                  {product?.description}
                </Typography>
              </Box>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  columnGap: 5,
                }}
              >
                <Box>
                  <Quantity quantity={quantity} setQuantity={setQuantity} />
                </Box>
                {product?.sizes && (
                  <Box>
                    <SelectField
                      enableReset={false}
                      title="Size"
                      selectValue={size}
                      setSelectValue={setSize}
                      options={product.sizes || []}
                    />
                  </Box>
                )}
              </Box>
              <Btn
                onBlur={() => setError("")}
                onClick={addToCart}
                size="medium"
                variant="contained"
                disableElevation
                endIcon={<ShoppingCart />}
                sx={{
                  mt: 3,
                }}
              >
                {ids.includes(id) ? "Buy More" : "add to cart"}
              </Btn>
              <Typography sx={{ color: "secondary.dark", fontSize: 12, mt: 1 }}>
                {error}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default memo(Product);
