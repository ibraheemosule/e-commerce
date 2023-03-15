import Typography from "@mui/material/Typography";
import { FC, memo, useState } from "react";
import Link from "next/link";
import {
  ImgBtn,
  Img,
  ImgBackdrop,
  ImgMarked,
  genderStyle,
} from "./u_productCard";
import Box from "@mui/material/Box";
import Image from "next/image";
import Btn from "../btn/Btn";
import { mutateCartList } from "../../../store/features/product/product-slice";
import Grid from "@mui/material/Grid";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

const ProductCard: FC<ProductCardProps> = (props) => {
  const { product, img, path, cart = true, title = "View" } = props;
  const { price, tag, name, id, gender } = product || {};
  const { cartList } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const ids = cartList.map((prod) => prod.id);

  const updateCart = () => id && dispatch(mutateCartList({ id }));

  return (
    <Box>
      <ImgBtn>
        <Image
          src={img}
          fill={true}
          sizes="(min-width: 600px) 33vw, 100vw"
          alt="product"
          style={{ objectFit: "cover" }}
        />
        <ImgBackdrop className="MuiImageBackdrop-root" />
        {cart && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <Box>
              <Typography sx={genderStyle}>{gender && gender[0]}</Typography>
            </Box>
            <Btn
              size="small"
              onClick={() => updateCart()}
              sx={{
                borderRadius: 0,
              }}
            >
              {ids.includes(id ?? "") ? "remove from cart" : "add to cart"}
            </Btn>
          </Box>
        )}
        <Img>
          <Link href={path} className="title">
            {title}
            <ImgMarked className="MuiImageMarked-root" />
          </Link>
        </Img>
        {!!product && (
          <Box
            component="aside"
            sx={{
              position: "absolute",
              bottom: "0",
              px: 2,
              py: 1,
              width: "100%",
              backgroundColor: "primary.dark",
              color: "primary.light",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: 18,
                    textTransform: "capitalize",
                  }}
                >
                  <strong>{name}</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography variant="h6">
                  &#8358;{price?.toFixed(2).toString()}
                </Typography>
                <Box
                  sx={{
                    borderWidth: 2,
                    borderColor: "secondary.main",
                    borderStyle: "dashed",
                    cursor: "pointer",

                    a: {
                      all: "unset",
                      display: "block",
                      padding: "0 8px",
                    },
                  }}
                >
                  <Link
                    href="/products"
                    style={{ textTransform: "capitalize" }}
                  >
                    {tag}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </ImgBtn>
    </Box>
  );
};

interface ProductCardProps {
  product?: {
    id: string;
    images: string[];
    tag: string;
    price: number;
    name: string;
    gender: string;
  };
  img: string;
  path: string;
  cart?: boolean;
  title?: string;
}
export default memo(ProductCard);
