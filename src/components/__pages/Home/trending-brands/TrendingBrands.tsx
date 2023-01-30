import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const currentYear = new Date().getFullYear(),
  logos = [
    "/images/nike logo.png",
    "/images/balenciaga logo.png",
    "/images/gucci logo.png",
    "/images/tommy hilfiger logo.png",
  ];

export default function TrendingBrands() {
  return (
    <Grid
      container
      mx="auto"
      bgcolor="primary.light"
      sx={{ py: { xs: 4, sm: 6 } }}
    >
      <Grid item xs={12}>
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          color="secondary.main"
        >
          {currentYear} Trending Brands
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ pt: { xs: 4, sm: 6 } }}>
        <Grid container rowGap={6}>
          {logos.map((imageSrc, i) => (
            <Grid
              key={i}
              item
              xs={8}
              sm={5.5}
              md={2.5}
              mx="auto"
              position="relative"
              sx={{ height: { xs: 200, sm: 200, md: 150, lg: 200 } }}
            >
              <Image src={imageSrc} alt="nike brand logo" fill={true} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
