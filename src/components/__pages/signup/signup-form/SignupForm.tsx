import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { memo } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

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
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default memo(LoginForm);
