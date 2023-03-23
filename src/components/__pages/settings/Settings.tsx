import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

export default memo(function Settings() {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Grid
          container
          gap={3}
          sx={{ bgcolor: "primary.light", p: { xs: 3, sm: 6 } }}
        >
          <Grid item xs={12}>
            <Typography
              component="h4"
              variant="h4"
              sx={{ color: "secondary.main" }}
            >
              Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                columnGap: { xs: 4 },
                overflow: "auto",
                maxWidth: 450,
              }}
            >
              {/* {[...new Array(100)].map((val, i) => (
                <ButtonBase
                  key={i}
                  sx={{
                    pb: 1,
                    borderBottom: "2px solid",
                    borderColor: "primary.dark",
                    color: "secondary.dark",
                    fontWeight: 500,

                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                >
                  wokring
                </ButtonBase>
              ))} */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});
