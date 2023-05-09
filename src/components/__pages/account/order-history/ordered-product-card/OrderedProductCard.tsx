import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { memo, FC } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useAppDispatch } from "../../../../../store/hooks";
import {
  resetProductsList,
  mutateProductsList,
} from "../../../../../store/features/product/product-slice";
import Link from "next/link";
import { useRouter } from "next/router";
import TagBtn from "../../../../others/btn/tag-btn/TagBtn";
import { PurchaseProductType } from "../../../../../utils/ts-types/__store/typesUser";

const OrderedProductCard: FC<OrderedProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const filterProductsList = async (obj: Record<string, string>) => {
    if (obj["size"]) return;
    dispatch(resetProductsList());
    dispatch(mutateProductsList(obj));
    await router.push("/products");
  };

  const filters = {
    filterValue: product.tag,
    genderValue: product.gender,
    size: product?.size,
  };

  return (
    <>
      <Grid
        item
        columnGap={{ xs: 1.5 }}
        rowGap={2}
        xs={12}
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ mt: 1 }}>
          <Image
            src={product.image}
            alt={`${product.name}`}
            width={50}
            height={50}
            quality={80}
            style={{ objectFit: "cover", background: "lightgray" }}
          />
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
            <Typography sx={{ color: "secondary.main" }}>
              <Link
                shallow
                href={`/product/${product.id}`}
                style={{ all: "unset", display: "block", cursor: "pointer" }}
              >
                {product.quantity} {product.name}
              </Link>
            </Typography>
            <Box>
              {Object.entries(filters).map(
                ([key, value]) =>
                  value && (
                    <Box key={value} sx={{ mt: 0.5, display: "inline-block" }}>
                      <TagBtn
                        text={value}
                        onClick={() =>
                          void filterProductsList({ [key]: value.toString() })
                        }
                        disabled={["quantity", "size"].includes(key)}
                      />
                    </Box>
                  )
              )}
            </Box>
          </Box>
          <Box>
            <Typography>
              &#8358;
              {(product.quantity * product?.price).toFixed(2).toLocaleString()}
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

interface OrderedProductCardProps {
  product: PurchaseProductType;
}

export default memo(OrderedProductCard);
