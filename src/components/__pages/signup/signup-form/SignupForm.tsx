import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Btn from "../../../others/btn/Btn";

const LoginForm = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          color="secondary.main"
        >
          Create An Account
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Container maxWidth="xs">
          <Box>
            <InputField placeholder="First Name" />
          </Box>
          <Box>
            <InputField placeholder="Last Name" />
          </Box>
          <Box>
            <InputField placeholder="Email" />
          </Box>

          <Box sx={{ display: "block" }}>
            <InputField placeholder="Password" type="password" />
          </Box>
          <Box sx={{ display: "block" }}>
            <Btn
              sx={{
                mt: 3,
                px: 6,
              }}
            >
              Submit
            </Btn>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default memo(LoginForm);
