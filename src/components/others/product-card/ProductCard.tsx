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
  resetProductsList,
} from "../../../store/features/product/product-slice";
import Grid from "@mui/material/Grid";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { nanoid } from "@reduxjs/toolkit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import ButtonBase from "@mui/material/ButtonBase";
import { ProductType } from "../../../utils/ts-types/__store/typesProduct";
import { tags } from "../../../utils/utilsData";
import { successPopup } from "../../../utils/utilsFunctions";

const ProductCard: FC<ProductCardProps> = (props) => {
  const { product, img, path, cart = true, title = "View" } = props;
  const { price, tag, name, id, gender, sizes } = product || {};
  const { cartList } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const ids = cartList.map((prod) => prod.productId);
  const quantity = 1;

  const addToCart = (size: string | number) => {
    successPopup("Product added successfully");

    id &&
      dispatch(
        mutateCartList({ productId: id, uid: nanoid(), size, quantity })
      );
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const openMenuOrAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    if (sizes?.length) {
      setAnchorElUser(e.currentTarget);
      return;
    }
    successPopup("Product added successfully");

    id && dispatch(mutateCartList({ productId: id, uid: nanoid(), quantity }));
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
              height: 40,
              display: "flex",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <Box sx={{ height: "100%" }}>
              <ButtonBase
                onClick={() =>
                  void filterProductsList({ genderValue: gender || "" })
                }
                sx={genderStyle}
              >
                {gender && gender[0]}
              </ButtonBase>
            </Box>
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
              sx={{
                mt: "39px",
              }}
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
          <Link
            onClick={() =>
              tags.includes(path) &&
              void filterProductsList({ filterValue: path || "" })
            }
            href={tags?.includes(path) ? "/products" : path}
            className="title"
          >
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
                  &#8358;{price?.toLocaleString()}
                </Typography>
                <Box
                  sx={{
                    borderWidth: 2,
                    borderColor: "secondary.main",
                    borderStyle: "dashed",
                    cursor: "pointer",
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
