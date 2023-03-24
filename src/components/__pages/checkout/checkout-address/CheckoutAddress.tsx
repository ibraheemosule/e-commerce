import {
  memo,
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { formControlStyle } from "./u_checkout-address";
import dynamic from "next/dynamic";
import LazyLoader from "../../../others/skeleton/Skeleton";
import useFillForm from "../../../others/hooks/fill-form/useFillForm";
import { addressFields, validateAddressForm } from "./u_checkout-address";
import { changeDeliveryDetails } from "../../../../store/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import FormBtn from "../../../others/btn/form-btn/FormBtn";
import { DeliveryDetailsType } from "../../../../utils/ts-types/data-types";

const AddressForm = dynamic(() => import("./address-form/AddressForm"), {
  loading: LazyLoader,
});

const CheckoutAddress: FC<CheckoutAddressProps> = ({ option, setOption }) => {
  const dispatch = useAppDispatch();
  const { userInfo, deliveryDetails } = useAppSelector(({ user }) => user);
  const [fields, setField] = useFillForm(addressFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function changeAddress(e: ChangeEvent<HTMLInputElement>) {
    setOption(e.target.value);
  }

  const confirmAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      validateAddressForm(fields);
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(changeDeliveryDetails(fields as DeliveryDetailsType));
    } catch (e) {
      let message = "An error occurred";
      if (e instanceof Error) message = e.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="form" onSubmit={(e) => void confirmAddress(e)}>
      <FormControl sx={formControlStyle}>
        <FormLabel>
          <Typography component="h4" variant="h4">
            Shipping Details
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
            value={option}
            onChange={(e) => changeAddress(e)}
          >
            <FormControlLabel
              value="default"
              control={<Radio />}
              label="Use Default Details"
            />
            <Container sx={{ textTransform: "capitalize" }}>
              <Typography>
                <strong>Name: </strong>
                {`${userInfo.firstName} ${userInfo.lastName}`}
              </Typography>
              <Typography mt={1}>
                <strong>Phone Number: </strong>
                {userInfo.phoneNo}
              </Typography>
              <Typography mt={1}>
                <strong>Address: </strong>
                {`${userInfo.address}, ${userInfo.city}, ${userInfo.state}`}
              </Typography>
            </Container>
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Use Custom Details"
              sx={{ mt: 2 }}
            />
          </RadioGroup>
          {option === "custom" && (
            <>
              <AddressForm
                setError={setError}
                fields={fields}
                setField={setField}
              />
              {!Object.values(deliveryDetails).join() && (
                <FormBtn text="use address" loading={loading} error={error} />
              )}
            </>
          )}
        </Container>
      </FormControl>
    </Container>
  );
};

interface CheckoutAddressProps {
  option: string;
  setOption: Dispatch<SetStateAction<string>>;
}

export default memo(CheckoutAddress);
