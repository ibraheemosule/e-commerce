import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { textFieldStyles } from "./u_inputField";
import { FC, memo, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ButtonBase from "@mui/material/ButtonBase";

const InputField: FC<IInputField> = (props) => {
  const [showText, setShowText] = useState("");
  const { border, darkBg, placeholder, textarea, type } = props;

  const handleShowText = () => {
    if (!showText) {
      setShowText("text");
      return;
    }
    setShowText("");
  };

  return (
    <Box position="relative">
      {border ? (
        <TextField
          label={placeholder}
          size="small"
          multiline={textarea}
          rows={textarea && 3}
          sx={textFieldStyles()}
        />
      ) : (
        <TextField
          label={placeholder}
          size="small"
          multiline={textarea}
          maxRows={textarea && 3}
          variant="standard"
          sx={textFieldStyles(darkBg, type)}
          type={showText || type || "text"}
        />
      )}
      {type === "password" && (
        <ButtonBase
          onClick={handleShowText}
          sx={{ position: "absolute", mt: 3, ml: -2 }}
        >
          {showText ? (
            <VisibilityOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </ButtonBase>
      )}
    </Box>
  );
};

interface IInputField {
  border?: true;
  darkBg?: "dark";
  placeholder: string;
  textarea?: true;
  type?: string;
}

export default memo(InputField);
