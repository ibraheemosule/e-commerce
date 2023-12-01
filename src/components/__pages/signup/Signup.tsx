import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { memo, useState, lazy, Suspense, FC } from "react";
import Grid from "@mui/material/Grid";
import SignupForm from "./signup-form/SignupForm";
import { signupFormFields } from "./u_signup";
import useFillForm from "../../others/hooks/fill-form/useFillForm";
import { IVerifyEmailProps } from "./verify-email/VerifyEmail";
import LazyLoader from "../../others/lazy-loader/LazyLoader";

const VerifyEmail = lazy(() => import("./verify-email/VerifyEmail"));

const VerifyEmailWrapper: FC<IVerifyEmailProps> = (props) => (
  <Suspense fallback={<LazyLoader />}>
    <VerifyEmail {...props} />
  </Suspense>
);

const Signup = () => {
  const [otpScreen, routeToOtpScreen] = useState(false);
  const [fields, setField] = useFillForm(signupFormFields);

  return (
    <>
      <Box py={{ xs: 9, sm: 12, lg: 15 }} px={2}>
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
            {otpScreen ? (
              <VerifyEmailWrapper
                fields={fields}
                routeToOtpScreen={routeToOtpScreen}
              />
            ) : (
              <SignupForm
                routeToOtpScreen={routeToOtpScreen}
                fields={fields}
                setField={setField}
              />
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Signup);
2;
