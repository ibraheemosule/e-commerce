import Typography from "@mui/material/Typography";
import { FC, memo, useState, MouseEvent } from "react";
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
import {
  mutateCartList,
  mutateProductsList,
  ProductType,
  resetProductsList,
} from "../../../store/features/product/product-slice";
import Grid from "@mui/material/Grid";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { nanoid } from "@reduxjs/toolkit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import ButtonBase from "@mui/material/ButtonBase";

const ProductCard: FC<ProductCardProps> = (props) => {
  const { product, img, path, cart = true, title = "View" } = props;
  const { price, tag, name, id, gender, sizes } = product || {};
  const { cartList } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const ids = cartList.map((prod) => prod.id);

  const addToCart = (size: string | number) => {
    id && dispatch(mutateCartList({ id, uid: nanoid(), size }));
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const openMenuOrAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    if (sizes?.length) {
      setAnchorElUser(e.currentTarget);
      return;
    }
    id && dispatch(mutateCartList({ id, uid: nanoid() }));
  };

  const filterProductsList = async (obj: Record<string, string>) => {
    dispatch(resetProductsList());
    dispatch(mutateProductsList(obj));
    if (router.asPath !== "/products") await router.push("/products");
  };

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
              flexWrap: "wrap",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <ButtonBase
              onClick={() =>
                void filterProductsList({ genderValue: gender || "" })
              }
              style={{ all: "unset", display: "block", cursor: "pointer" }}
            >
              <Typography sx={genderStyle}>{gender && gender[0]}</Typography>
            </ButtonBase>
            <Btn
              size="small"
              onClick={openMenuOrAddToCart}
              sx={{
                borderRadius: 0,
              }}
            >
              {ids.includes(id ?? "") && !anchorElUser
                ? "Buy More"
                : anchorElUser
                ? "Select size"
                : "add to cart"}
            </Btn>

            <Menu
              sx={{ mt: "30px" }}
              elevation={3}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {sizes?.map((size) => (
                <MenuItem key={size} onClick={() => addToCart(size)}>
                  {size}
                </MenuItem>
              ))}
            </Menu>
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
                  <ButtonBase
                    sx={{
                      all: "unset",
                      display: "block",
                      cursor: "pointer",
                      textTransform: "capitalize",
                      px: 1,
                    }}
                    onClick={() =>
                      void filterProductsList({ filterValue: tag || "" })
                    }
                  >
                    {tag}
                  </ButtonBase>
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
  product?: ProductType;
  img: string;
  path: string;
  cart?: boolean;
  title?: string;
}
export default memo(ProductCard);
