import Box from "@mui/system/Box";
import { memo, useState, useEffect, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import FormBtn from "../../../../others/btn/form-btn/FormBtn";
import InputField from "../../../../others/input-field/InputField";
import {
  validatePassword,
  successPopup,
  errorPopup,
  sessionExpired,
} from "../../../../../utils/utilsFunctions";
import { useUpdateInfoMutation } from "../../../../../store/features/new-user/new-user-slice";
import { UserType } from "../../../../../utils/ts-types/__store/typesUser";
import { responseError } from "../../../../../utils/apiErrorResponse";
import { useAppSelector } from "../../../../../store/hooks";

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
      if (validatePassword(oldPassword) !== "true")
        throw Error(`Current password is incorrect`);

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
    } catch (e) {
      if (responseError(e)) {
        const noAuth = e.data.message.includes("not authenticated");

        if (noAuth) {
          await sessionExpired();
          return;
        }

        setError(e.data.message);
        errorPopup(e.data.message);
      }

      let message = "An error occured";

      if (e instanceof Error) {
        message = e.message;
      }
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
            placeholder="Current Password"
            type="password"
            value={oldPassword}
            onChange={setPasswordValues}
            name="oldPassword"
          />
          <Box>
            <InputField
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={setPasswordValues}
              name="newPassword"
            />
          </Box>
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
