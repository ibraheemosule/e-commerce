import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import { FC, memo } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const LoginForm: FC<LoginFormProps> = ({ routeToPasswordPage }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          color="secondary.main"
        >
          Login
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Container maxWidth="xs">
          <Box>
            <InputField placeholder="Email" />
          </Box>
          <Box sx={{ display: "block", mt: 3 }}>
            <InputField placeholder="Password" type="password" />

            <ButtonBase onClick={routeToPasswordPage}>
              <Typography
                component="p"
                sx={{
                  fontSize: 16,
                  color: "secondary.main",
                  "&:hover": {
                    color: "secondary.dark",
                  },
                }}
              >
                Forgot password?
              </Typography>
            </ButtonBase>
          </Box>
          <Box sx={{ display: "block" }}>
            <Button
              sx={{
                bgcolor: "secondary.main",
                color: "primary.dark",
                mt: 3,
                px: 6,
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              Submit
            </Button>
            <Typography
              component="p"
              sx={{
                fontSize: 18,
                mt: 6,
                color: "secondary.main",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
            >
              Create an account
            </Typography>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

interface LoginFormProps {
  routeToPasswordPage: () => void;
}

export default memo(LoginForm);
