import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import {
  Children,
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
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
import {
  mutateCartList,
  resetProductsList,
  mutateProductsList,
} from "../../../store/features/product/product-slice";
import { nanoid } from "@reduxjs/toolkit";
import dynamic from "next/dynamic";

const NoProduct = dynamic(() => import("./NoProduct"));

export default memo(function Product() {
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const { immutableProducts, cartList } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ids = cartList.map((prod) => prod.id);
  const id = router.query.id as string;

  const product = useMemo(
    () => immutableProducts.filter((prod) => prod.id === id)[0] || {},
    [id, immutableProducts]
  );

  useEffect(() => {
    if (product.images) setSelectedImg(product?.images[0]);
  }, [product.images]);

  const addToCart = useCallback(() => {
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
      dispatch(mutateCartList({ id, uid: nanoid(), size, quantity }));
    } else dispatch(mutateCartList({ id, uid: nanoid(), quantity }));
  }, [cartList, dispatch, id, product.sizes, quantity, size]);

  const filterProductsList = useCallback(
    async (obj: Record<string, string>) => {
      dispatch(resetProductsList());
      dispatch(mutateProductsList(obj));
      await router.push("/products");
    },
    [dispatch, router]
  );

  const filters = {
    genderValue: product.gender,
    filterValue: product.tag,
  };

  if (!product.name) {
    return <NoProduct />;
  }

  return (
    <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
      <Grid
        container
        maxWidth="lg"
        sx={{ bgcolor: "primary.light", rowGap: 2, py: 6, px: 3 }}
      >
        <Grid item xs={12} sm={6} md={7}>
          <Grid container maxWidth="lg" gap={3}>
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
            <Grid item xs={12} sm={11} order={{ md: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  columnGap: { xs: 2 },
                  overflow: "auto",
                  overflowY: "hidden",
                }}
              >
                {Children.toArray(
                  product?.images?.map((img) => (
                    <>
                      <ButtonBase
                        onClick={() => setSelectedImg(img)}
                        sx={{
                          padding: "4px",
                          border:
                            selectedImg === img ? "1px solid" : "1px solid",
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
                    </>
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
              mt: 1,
              textTransform: "capitalize",
              color: "secondary.light",
            }}
          >
            {Object.entries(filters).map(
              ([key, value]) =>
                value && (
                  <ButtonBase
                    key={value}
                    onClick={() => void filterProductsList({ [key]: value })}
                    sx={{
                      border: "1px solid lightgray",
                      textTransform: "capitalize",
                      color: "secondary.light",
                      padding: ".2rem",
                      marginRight: "10px",
                    }}
                  >
                    {value}
                  </ButtonBase>
                )
            )}
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
              mt: 3,
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
  );
});
