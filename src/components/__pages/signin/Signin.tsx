import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SigninForm from "./signin-form/SigninForm";
import { memo, useState } from "react";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import LazyLoader from "../../others/skeleton/Skeleton";

const ForgotPassword = dynamic(
  () => import("./forgot-password/ForgotPassword"),
  { loading: LazyLoader }
);

const Signin = () => {
  const [showPasswordPage, setShowPasswordPage] = useState(false),
    routeToPasswordPage = () => setShowPasswordPage((prev) => !prev),
    PageJsx = showPasswordPage ? ForgotPassword : SigninForm;

  return (
    <>
      <Box bgcolor="primary.main" py={{ xs: 9, sm: 12, lg: 15 }}>
        <Container>
          <Grid
            container
            maxWidth="sm"
            mx="auto"
            minHeight={350}
            py={{ xs: 4, sm: 6 }}
            rowGap={2}
            bgcolor="primary.light"
            position="relative"
            sx={{
              boxShadow: "1px 2px 8px -4px rgba(0,0,0,0.75)",
            }}
          >
            {<PageJsx routeToPasswordPage={routeToPasswordPage} />}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Signin);
