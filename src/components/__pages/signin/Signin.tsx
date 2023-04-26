import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SigninForm from "./signin-form/SigninForm";
import { memo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import LazyLoader from "../../others/lazy-loader/LazyLoader";
import { persistor } from "../../../store/store";
import {
  userDefaultState,
  resetState,
} from "../../../store/features/user/user-slice";
import { useAppDispatch } from "../../../store/hooks";

const ForgotPassword = dynamic(
  () => import("./forgot-password/ForgotPassword"),
  { loading: LazyLoader }
);

const Signin = () => {
  const dispatch = useAppDispatch(),
    [showPasswordPage, setShowPasswordPage] = useState(false),
    routeToPasswordPage = () => setShowPasswordPage((prev) => !prev),
    PageJsx = showPasswordPage ? ForgotPassword : SigninForm;

  useEffect(() => {
    void (async () => {
      dispatch(resetState(userDefaultState));
      await persistor.flush();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box bgcolor="primary.main" py={{ xs: 9, sm: 12, lg: 15 }} px={2}>
        <Container>
          <Grid
            container
            maxWidth="sm"
            mx="auto"
            minHeight={350}
            py={{ xs: 4, sm: 6 }}
            px={2}
            rowGap={2}
            bgcolor="primary.light"
            position="relative"
            // sx={{
            //   boxShadow: "1px 2px 8px -4px rgba(0,0,0,0.75)",
            // }}
          >
            {<PageJsx routeToPasswordPage={routeToPasswordPage} />}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Signin);
