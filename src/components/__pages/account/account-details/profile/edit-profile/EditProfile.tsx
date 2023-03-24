import Box from "@mui/system/Box";
import {
  memo,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import FormBtn from "../../../../../others/btn/form-btn/FormBtn";
import InputField from "../../../../../others/input-field/InputField";
import useFillForm from "../../../../../others/hooks/fill-form/useFillForm";
import {
  defaultFields,
  validateProfileFields,
  fullProfile,
} from "./u_editProfile";
import { useAppSelector, useAppDispatch } from "../../../../../../store/hooks";
import { updateUserInfo } from "../../../../../../store/features/user/user-slice";
import { UserType } from "../../../../../../utils/ts-types/data-types";

export default memo(function EditProfile({ setEdit }: EditDetailsProp) {
  const dispatch = useAppDispatch();
  const [fields, setField] = useFillForm(defaultFields);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    Object.keys(fields).forEach((field) => {
      const key = field as keyof UserType;
      setField({ payload: { [field]: userInfo[key] as unknown as string } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (value: Record<string, string>) => {
    setError("");
    setField({ payload: value });
  };

  function updateDetails(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      validateProfileFields(fields);
      dispatch(updateUserInfo(fields as unknown as UserType));
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
        const formKey = key as unknown as keyof typeof fullProfile;
        return (
          <Box
            key={key}
            sx={{
              maxWidth: 250,
            }}
          >
            <InputField
              placeholder={fullProfile[formKey].placeholder}
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
