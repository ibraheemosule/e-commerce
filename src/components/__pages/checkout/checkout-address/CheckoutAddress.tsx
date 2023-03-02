import { memo, useState, ChangeEvent } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddressForm from "./address-form/AddressForm";
import { formControlStyle } from "./u_checkout-address";

const CheckoutAddress = () => {
  const [addressOption, setAddressOption] = useState("default");

  function changeAddress(e: ChangeEvent<HTMLInputElement>) {
    setAddressOption(e.target.value);
  }
  return (
    <Container>
      <FormControl sx={formControlStyle}>
        <FormLabel>
          <Typography component="h4" variant="h4">
            Shipping Address
          </Typography>
        </FormLabel>
        <Container
          sx={{
            my: 2,
          }}
        >
          <RadioGroup
            aria-labelledby="Address selection"
            name="address-selection"
            value={addressOption}
            onChange={(e) => changeAddress(e)}
          >
            <FormControlLabel
              value="default"
              control={<Radio />}
              label="Use Default Address"
            />
            <Container>
              <Typography>
                20, Ibraheem Musa Street, Idimu/Ejigbo Road, Alimosho Local
                Government, Lagos State.
              </Typography>
            </Container>
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Fill Another Address"
              sx={{ mt: 2 }}
            />
          </RadioGroup>
          {addressOption === "custom" && <AddressForm />}
          <Box>
            <InputLabel htmlFor="my-input"></InputLabel>
          </Box>
        </Container>
      </FormControl>
    </Container>
  );
};

export default memo(CheckoutAddress);
