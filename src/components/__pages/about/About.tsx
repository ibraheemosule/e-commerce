import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Box from "@mui/material/Box";

export default memo(function About() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
      <Container
        sx={{
          bgcolor: "primary.light",
          px: { xs: 4, sm: 6, md: 3 },
          py: 6,
        }}
      >
        <Typography
          sx={{
            display: { md: "none" },
            mb: { xs: 0, sm: 2 },
            color: "secondary.main",
          }}
          component="h1"
          variant="h3"
        >
          Learn about 1907 stores
        </Typography>
        <Grid container mx="auto">
          <Grid
            item
            xs={12}
            md={5}
            mx="auto"
            mt={2}
            sx={{ order: { xs: 2, md: 0 }, mt: { md: 2 }, mx: "auto" }}
          >
            <Typography
              sx={{ display: { xs: "none", md: "block" } }}
              component="h1"
              variant="h3"
              color="secondary.main"
            >
              Learn about 1907 stores
            </Typography>
            <Typography sx={{ mt: 3 }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            mx="auto"
            mt={{ xs: 2, sm: 0 }}
            alignSelf="center"
          >
            <Box
              sx={{
                position: "relative",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="/images/about-us2.jpg"
                alt="about us visual illustration"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
});
