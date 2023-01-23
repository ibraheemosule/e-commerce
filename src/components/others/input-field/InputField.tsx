import TextField from "@mui/material/TextField";
import { textFieldStyles } from "./u_inputField";
import { FC, memo } from "react";

const InputField: FC<IInputField> = ({
  border,
  darkBg,
  placeholder,
  textarea,
}) => {
  return (
    <>
      {border ? (
        <TextField
          id="outlined-size-small"
          label={placeholder}
          size="small"
          multiline={textarea}
          rows={textarea && 4}
          sx={textFieldStyles()}
        />
      ) : (
        <TextField
          label={placeholder}
          id="standard-size-small"
          size="small"
          multiline={textarea}
          maxRows={textarea && 3}
          variant="standard"
          sx={textFieldStyles(darkBg)}
        />
      )}
    </>
  );
};

interface IInputField {
  border?: true;
  darkBg?: "dark";
  placeholder: string;
  textarea?: true;
}

export default memo(InputField);
