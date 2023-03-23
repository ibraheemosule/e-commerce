import Box from "@mui/system/Box";
import { memo, useState, useEffect, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import FormBtn from "../../../../others/btn/form-btn/FormBtn";
import InputField from "../../../../others/input-field/InputField";
import { validatePassword } from "../../../../../utils/utilsFunctions";

export default memo(function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => setError(""), [oldPassword, newPassword]);

  function setPasswordValues(value: Record<string, string>) {
    if (value.oldPassword !== undefined) {
      setOldPassword(value.oldPassword);
      return;
    }
    setNewPassword(value.newPassword);
  }

  function submitPassword(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (validatePassword(newPassword) !== "true")
        throw Error(
          `New Password must contain ${validatePassword(newPassword)}`
        );
    } catch (e) {
      let message = "An error occured";
      if (e instanceof Error) message = e.message;
      setError(message);
    } finally {
      setLoading(false);
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
        onSubmit={submitPassword}
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
          loading={loading}
          error={error}
          btnSize="small"
          text="submit"
        />
      </Box>
    </>
  );
});
