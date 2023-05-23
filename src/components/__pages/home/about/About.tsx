import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";
import Box from "@mui/system/Box";

export default function About() {
  return (
    <Container id="about" sx={{ bgcolor: "primary.light" }}>
      <Grid
        container
        alignItems="center"
        columnSpacing={4}
        sx={{ py: { xs: 4, sm: 6 } }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            component="h4"
            variant="h4"
            textAlign="center"
            color="secondary.main"
          >
            About 1907 Store
          </Typography>
          <Typography component="p" color="primary.dark" mt={2}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: { xs: 4, sm: 6, md: 0 } }}>
          <Box
            sx={{
              height: { xs: "200px", md: "300px", lg: "400px" },
              position: "relative",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="about us"
              priority
              fill
              style={{ objectFit: "contain" }}
              sizes="100%"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
