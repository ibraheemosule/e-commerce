import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";

const Cart = () => {
  return (
    <>
      <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light" }}>
          <Grid container>
            <Grid item gap={4} xs={12} sx={{ display: "flex", my: 6 }}>
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
              <Box>
                <Typography component="h1" variant="h5" color="secondary.main">
                  Air Max. Air Max 97
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default memo(Cart);
