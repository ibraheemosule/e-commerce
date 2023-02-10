import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { memo, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";
import Quantity from "../../../others/quantity/Quantity";
import Divider from "@mui/material/Divider";

const CartProductCard = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Grid
        item
        columnGap={{ xs: 1.5, sm: 4 }}
        rowGap={2}
        xs={12}
        md={8.5}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 6,
          mb: { xs: 0, md: 6 },
        }}
      >
        <Box>
          <Image
            src="/images/purse.jpg"
            alt="product in the cart"
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
              Air Max. Air Max 97
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
              &#8358;20, 000
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Divider
        sx={{ display: { xs: "none", md: "block" }, mx: 2 }}
        orientation="vertical"
        flexItem
      />
      <Grid item xs={12} my={2} sx={{ display: { xs: "block", md: "none" } }}>
        <Divider />
      </Grid>
    </>
  );
};

export default memo(CartProductCard);
