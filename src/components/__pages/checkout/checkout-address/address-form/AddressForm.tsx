import { Dispatch, FC, memo, SetStateAction } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputField from "../../../../others/input-field/InputField";
import { userForm } from "../../../../../utils/utilsData";
import { formFields } from "../../../../../utils/utilsFunctions";
import { useAppSelector } from "../../../../../store/hooks";
const form = formFields(userForm);

export type AddressFormFieldsType = typeof form;

const AddressForm: FC<AddressFormProps> = ({ fields, setField, setError }) => {
  const { deliveryDetails } = useAppSelector(({ user }) => user);

  const updateField = (value: Record<string, string>) => {
    setError("");
    setField({ payload: value });
  };

  return (
    <Container>
      <Grid justifyContent="space-between" container>
        {Object.keys(form).map((field, i) => {
          const value = field as keyof typeof userForm;
          return (
            <Grid
              key={i}
              item
              sx={{
                position: "relative",
              }}
              {...userForm[value].gridProps}
            >
              <InputField
                placeholder={userForm[value].placeholder}
                value={fields[field]}
                onChange={updateField}
                name={field}
                type="text"
                disabled={!!Object.values(deliveryDetails).join()}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

interface AddressFormProps {
  fields: Record<string, string>;
  setField: Dispatch<{ payload: Record<string, string> }>;
  setError: Dispatch<SetStateAction<string>>;
}

export default memo(AddressForm);
