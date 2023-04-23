import Box from "@mui/system/Box";
import { memo, useState, useEffect, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import FormBtn from "../../../../others/btn/form-btn/FormBtn";
import InputField from "../../../../others/input-field/InputField";
import {
  validatePassword,
  successPopup,
  errorPopup,
} from "../../../../../utils/utilsFunctions";
import { useUpdateInfoMutation } from "../../../../../store/features/new-user/new-user-slice";
import { UserType } from "../../../../../utils/ts-types/__store/typesUser";
import { responseError } from "../../../../../utils/apiErrorResponse";
import { useAppSelector } from "../../../../../store/hooks";
import Router from "next/router";

export default memo(function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [updateInfo, { isLoading }] = useUpdateInfoMutation();
  const { email } = useAppSelector(({ user }) => user.userInfo);

  useEffect(() => setError(""), [oldPassword, newPassword]);

  function setPasswordValues(value: Record<string, string>) {
    if (value.oldPassword !== undefined) {
      setOldPassword(value.oldPassword);
      return;
    }
    setNewPassword(value.newPassword);
  }

  async function submitPassword(e: FormEvent) {
    e.preventDefault();

    try {
      if (validatePassword(newPassword) !== "true")
        throw Error(
          `New Password must contain ${validatePassword(newPassword)}`
        );

      await updateInfo({
        email,
        oldPassword,
        password: newPassword,
      } as unknown as UserType).unwrap();

      successPopup("Password updated");

      setPasswordValues({ newPassword: "" });
      setPasswordValues({ oldPassword: "" });

      Router.reload();
    } catch (e) {
      console.log(e);
      if (responseError(e)) {
        setError(e.data.message);
        errorPopup(e.data.message);
        return;
      }
      let message = "An error occured";
      if (e instanceof Error) message = e.message;
      setError(message);
    }
  }

  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        sx={{
          color: "secondary.main",
          fontWeight: 400,
          lineHeight: 0.2,
        }}
      >
        Change Password
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => void submitPassword(e)}
        sx={{
          ".error-msg": {
            textAlign: "left",
          },
        }}
      >
        <Box sx={{ maxWidth: 250 }}>
          <InputField
            placeholder="Old Password"
            value={oldPassword}
            onChange={setPasswordValues}
            name="oldPassword"
          />
          <InputField
            placeholder="New Password"
            value={newPassword}
            onChange={setPasswordValues}
            name="newPassword"
          />
        </Box>
        <FormBtn
          loading={isLoading}
          error={error}
          btnSize="small"
          text="submit"
        />
      </Box>
    </>
  );
});
