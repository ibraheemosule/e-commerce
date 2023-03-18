import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { textFieldStyles } from "./u_inputField";
import { FC, memo, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ButtonBase from "@mui/material/ButtonBase";
import { ChangeEvent } from "react";

const InputField: FC<InputFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState("");
  const { border, darkBg, placeholder, textarea, type, name, onChange } = props;

  const handleShowPassword = () => {
    if (!showPassword) {
      setShowPassword("text");
      return;
    }
    setShowPassword("");
  };

  const getFieldValue = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <Box position="relative">
      {border ? (
        <TextField
          name={name || ""}
          value={props.value}
          onChange={(e) => getFieldValue(e)}
          label={placeholder}
          size="small"
          multiline={textarea}
          rows={textarea && 3}
          sx={textFieldStyles()}
        />
      ) : (
        <TextField
          name={name || ""}
          value={props.value}
          onChange={(e) => getFieldValue(e)}
          label={placeholder}
          size="small"
          multiline={textarea}
          maxRows={textarea && 3}
          spellCheck={textarea && true}
          variant="standard"
          sx={textFieldStyles(darkBg, type)}
          type={showPassword || type || "text"}
        />
      )}
      {type === "password" && (
        <ButtonBase
          onClick={handleShowPassword}
          sx={{ position: "absolute", mt: 3, ml: -2 }}
        >
          {showPassword ? (
            <VisibilityOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </ButtonBase>
      )}
    </Box>
  );
};

interface InputFieldProps {
  border?: true;
  darkBg?: "dark";
  placeholder: string;
  textarea?: true;
  type?: string;
  name?: string;
  onChange: (value: { [key: string]: string }) => void;
  value: string;
}

export default memo(InputField);
