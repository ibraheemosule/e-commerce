import Typography from "@mui/material/Typography";
import { FC, memo } from "react";
import Link from "next/link";
import { ImgBtn, Img, ImgBackdrop, ImgMarked } from "./u_productCard";
import Box from "@mui/material/Box";
import Image from "next/image";
import Btn from "../btn/Btn";
import Grid from "@mui/material/Grid";

const ProductCard: FC<ProductCardProps> = (props) => {
  const { product, img, path, cart = true, title = "View" } = props;
  const { price, tag, name } = product || {};

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
          <Btn
            size="large"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: 0,
              zIndex: 2,
            }}
          >
            add to cart
          </Btn>
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
                <Typography sx={{ fontSize: 16, textTransform: "capitalize" }}>
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
                <Typography variant="h6">&#8358;{price}</Typography>
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
                  <Link href="/products">{tag}</Link>
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
  };
  img: string;
  path: string;
  cart?: boolean;
  title?: string;
}
export default memo(ProductCard);
