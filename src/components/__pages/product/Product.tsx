import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo, useState } from "react";
import Image from "next/image";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { CustomDivider as Divider } from "./u_product";
import SelectField from "../../others/select-field/SelectField";
import Button from "@mui/material/Button";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Quantity from "../../others/quantity/Quantity";

const Product = () => {
  const [showDescription, setShowDescription] = useState(false),
    [quantity, setQuantity] = useState(1);

  return (
    <>
      <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light" }}>
          <Grid container maxWidth="lg" py={6} rowGap={2}>
            <Grid item xs={12} sm={6} md={7}>
              <Grid container maxWidth="lg" gap={3}>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  md={9}
                  order={{ md: 1 }}
                  sx={{
                    aspectRatio: { xs: "3/2", sm: "1" },
                    position: "relative",
                  }}
                >
                  <Image
                    src="/images/shoe.jpg"
                    fill
                    sizes="(min-width: 600px) 40vw, 100vw"
                    alt="product"
                    style={{ objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={12} md="auto" order={{ md: 0 }}>
                  <Box
                    sx={{
                      display: { sx: "flex", md: "inline-flex" },
                      gap: { xs: 2, md: 1 },
                      flexWrap: "wrap",
                    }}
                  >
                    <ButtonBase
                      sx={{
                        padding: "4px",
                        border: "1px solid gray",
                        transition: "all .2s ease-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                          borderColor: "transparent",
                        },
                      }}
                    >
                      <Image
                        src="/images/shoe.jpg"
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                        alt="product"
                      />
                    </ButtonBase>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={5} color="primary.dark">
              <Typography component="h1" variant="h5" color="secondary.main">
                Air Max. Air Max 97
              </Typography>
              <Divider />
              <Typography component="h1" variant="h6">
                &#8358;20, 000
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
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </Typography>
              </Box>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                <Box sx={{ display: "flex", gap: 3 }}>
                  <SelectField />
                  <SelectField />
                </Box>
              </Box>
              <Button
                size="large"
                variant="contained"
                endIcon={<ShoppingCart />}
                sx={{
                  bgcolor: "secondary.main",
                  my: 4,

                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default memo(Product);
