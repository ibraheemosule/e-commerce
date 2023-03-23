import Box from "@mui/system/Box";
import { memo, useState, FormEvent, Dispatch, SetStateAction } from "react";
import FormBtn from "../../../../../others/btn/form-btn/FormBtn";
import InputField from "../../../../../others/input-field/InputField";
import { userForm } from "../../../../../../utils/utilsData";
import useFillForm from "../../../../../others/hooks/fill-form/useFillForm";
import { defaultFields, validateProfileFields } from "./u_editProfile";

export default memo(function EditProfile({ setEdit }: EditDetailsProp) {
  const [fields, setField] = useFillForm(defaultFields);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (value: Record<string, string>) => {
    setError("");
    setField({ payload: value });
  };

  function updateDetails(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      validateProfileFields(fields);
      setEdit(false);
    } catch (e) {
      let message = "An error occurred";
      if (e instanceof Error) message = e.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={updateDetails}
      sx={{
        ".error-msg": {
          textAlign: "left",
        },
      }}
    >
      {Object.keys(defaultFields).map((key) => {
        const formKey = key as unknown as keyof typeof userForm;
        return (
          <Box
            key={key}
            sx={{
              maxWidth: 250,
            }}
          >
            <InputField
              placeholder={userForm[formKey].placeholder}
              name={key}
              value={fields[key]}
              textarea={key === "address" ? true : undefined}
              onChange={updateField}
            />
          </Box>
        );
      })}
      <FormBtn
        error={error}
        text="update details"
        btnSize="small"
        loading={loading}
        onCancel={() => void setEdit(false)}
      />
    </Box>
  );
});

interface EditDetailsProp {
  setEdit: Dispatch<SetStateAction<boolean>>;
}
