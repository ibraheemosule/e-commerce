import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Box from "@mui/material/Box";

export const sizeGuideImage = [
  "/images/belt sizes.jpg",
  "/images/shoe sizes.png",
];

export default memo(function SizeGuide() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
      <Container
        sx={{
          bgcolor: "primary.light",
          px: { xs: 2, sm: 6, md: 3 },
          py: 6,
        }}
      >
        <Grid container mx="auto">
          <Grid item xs={12}>
            <Grid container>
              {sizeGuideImage.map((imageSrc, i) => (
                <Grid key={i} item xs={12} md={5} mx="auto" mt={2}>
                  <Box>
                    <Typography
                      component="h4"
                      variant="h5"
                      color="secondary.main"
                    >
                      {imageSrc.includes("belt") ? "Belts" : "Shoes"} Sizes
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "1/1",
                      bgcolor: "primary.main",
                      my: 2,
                    }}
                  >
                    <Image src={imageSrc} alt="size" fill />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
});

// Shoes:
// We accept returns within 30 days of the purchase date.
// The shoes must be in their original condition, unworn and with all tags attached.
// The customer is responsible for the cost of return shipping unless the shoes arrived damaged or defective.
// Refunds will be issued to the original form of payment.

// Belts:
// We accept returns within 30 days of the purchase date.
// The belt must be in its original condition, unworn and with all tags attached.
// The customer is responsible for the cost of return shipping unless the belt arrived damaged or defective.
// Refunds will be issued to the original form of payment.

// Bags:
// We accept returns within 30 days of the purchase date.
// The bag must be in its original condition, unused and with all tags attached.
// The customer is responsible for the cost of return shipping unless the bag arrived damaged or defective.
// Refunds will be issued to the original form of payment.
// Please note that these are general policies and specific details may vary between different products and brands. We always strive to ensure our customers are satisfied with their purchase and are happy to answer any questions or concerns regarding returns.
