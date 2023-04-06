import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { Children, memo, useState, useCallback } from "react";
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
import TagBtn from "../../others/btn/tag-btn/TagBtn";
import { nanoid } from "@reduxjs/toolkit";
import dynamic from "next/dynamic";
import { ProductType } from "../../../utils/ts-types/__store/typesProduct";
import useFade from "../../others/hooks/fade-transition/useFade";
import { animated } from "@react-spring/web";
import { toast } from "react-toastify";

const NoProduct = dynamic(() => import("./no-product/NoProduct"));

export default memo(function Product({ product }: { product: ProductType }) {
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [selectedImg, setSelectedImg] = useState(product?.images[0]);
  const { cartList } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ids = cartList.map((prod) => prod.productId);
  const id = product?.id;
  const fade = useFade(showDescription);
  const imageAnimation = useFade(selectedImg);

  const addToCart = useCallback(() => {
    if (product?.sizes && !size) {
      setError("Select a Size");
      return;
    }

    const findProduct = cartList.find(
      (prod) => prod.productId === id && prod.size === size
    )!;

    if (findProduct) {
      dispatch(
        mutateCartList({
          ...findProduct,
          quantity: Number(findProduct.quantity) + quantity,
        })
      );
      return;
    }
    if (product?.sizes) {
      dispatch(
        mutateCartList({ productId: id, uid: nanoid(), size, quantity })
      );
    } else dispatch(mutateCartList({ productId: id, uid: nanoid(), quantity }));

    toast("Product added to cart", {
      type: "success",
      autoClose: 300,
    });
  }, [cartList, dispatch, id, product?.sizes, quantity, size]);

  const filterProductsList = useCallback(
    async (obj: Record<string, string>) => {
      dispatch(resetProductsList());
      dispatch(mutateProductsList(obj));
      await router.push("/products");
    },
    [dispatch, router]
  );

  const filters = {
    genderValue: product?.gender,
    filterValue: product?.tag,
  };

  if (!product?.name) {
    return <NoProduct product={product} />;
  }

  return (
    <Container sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
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
              {imageAnimation((props, trigger) => (
                <animated.div style={props} key={trigger}>
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
                </animated.div>
              ))}
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
                  <TagBtn
                    text={value}
                    onClick={() =>
                      void filterProductsList({ [key]: value.toString() })
                    }
                    key={value}
                  />
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
            {fade((props, trigger) => (
              <animated.div style={props} key={String(trigger)}>
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
              </animated.div>
            ))}
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
                  options={product?.sizes || []}
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
