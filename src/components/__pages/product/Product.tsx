import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";

const Product = () => {
  return (
    <>
      <Box bgcolor="primary.main" py={{ xs: 9, sm: 12, lg: 15 }}>
        <Container>
          <Grid container maxWidth="lg" bgcolor="primary.light" py={6}></Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Product);
