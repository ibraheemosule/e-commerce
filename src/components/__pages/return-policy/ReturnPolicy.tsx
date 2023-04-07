import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { returnPolicy } from "./u_returnPolicy";

export default memo(function ReturnPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
      <Container
        sx={{
          bgcolor: "primary.light",
          py: 4,
          px: 2,
        }}
      >
        <Grid container mx="auto">
          <Grid item xs={12}>
            <Typography
              component="h4"
              variant="h4"
              color="secondary.main"
              textAlign="center"
              my={2}
            >
              Return Policy
            </Typography>
            <Grid item xs={12} mx="auto" mt={4}>
              <Box
                component="ul"
                sx={{
                  fontWeight: 500,
                  fontSize: 18,
                  color: "primary.dark",
                  m: 0,
                  px: { xs: 2, sm: 4, md: 8 },
                }}
              >
                {returnPolicy.map((policy) => (
                  <Box key={policy} component="li" sx={{ my: 1 }}>
                    {policy}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
});
