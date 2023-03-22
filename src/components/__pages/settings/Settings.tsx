import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";
import ButtonBase from "@mui/material/ButtonBase";

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
            <Box
              sx={{
                display: "flex",
                columnGap: { xs: 2 },
                overflow: "auto",
                maxWidth: 500,
              }}
            >
              {/* {[...new Array(100)].map((val, i) => (
                <ButtonBase
                  key={i}
                  sx={{
                    padding: "4px",
                    "&:hover": {
                      transform: "scale(1.05)",
                      borderColor: "transparent",
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
