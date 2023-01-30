import Typography from "@mui/material/Typography";
import { FC, memo } from "react";
import Link from "next/link";
import { ImgBtn, ImgSrc, Img, ImgBackdrop, ImgMarked } from "./u_productCard";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { url, title } = product;

  return (
    <Link
      href="/about"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <ImgBtn focusRipple>
        <ImgSrc style={{ backgroundImage: `url(${url})` }} />
        <ImgBackdrop className="MuiImageBackdrop-root" />

        <Img>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: "relative",
              fontSize: (theme) => theme.spacing(3),
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            }}
          >
            {title}
            <ImgMarked className="MuiImageMarked-root" />
          </Typography>
        </Img>
      </ImgBtn>
    </Link>
  );
};

interface ProductCardProps {
  product: { url: string; title: string };
}
export default memo(ProductCard);
