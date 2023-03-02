import { memo } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputField from "../../../../others/input-field/InputField";

const AddressForm = () => {
  return (
    <Container>
      <Grid justifyContent="space-between" container>
        <Grid item xs={12} sm={5.5}>
          <InputField placeholder="First Name" />
        </Grid>
        <Grid item xs={12} sm={5.5}>
          <InputField placeholder="Last Name" />
        </Grid>
        <Grid item xs={12}>
          <InputField placeholder="Address" />
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <InputField placeholder="Phone Number" />
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <InputField placeholder="City" />
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <InputField placeholder="State" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(AddressForm);
