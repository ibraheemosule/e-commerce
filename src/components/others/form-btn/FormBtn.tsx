import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FC, memo } from "react";
import Btn from "../btn/Btn";

const FormBtn: FC<FormBtnProps> = ({ btnSize, text, error }) => {
  return (
    <Box sx={{ display: "block", position: "relative" }}>
      <Btn
        size={btnSize}
        sx={{
          mt: { xs: 5, sm: 3 },
          px: 6,
        }}
        type="submit"
      >
        {text}
      </Btn>
      <Typography
        sx={{
          position: "absolute",
          textAlign: "center",
          width: "100%",
          top: 0,
          color: "secondary.dark",
          fontSize: 12,
          textTransform: "capitalize",
        }}
      >
        {error}
      </Typography>
    </Box>
  );
};

interface FormBtnProps {
  btnSize?: "small" | "medium" | "large";
  text: string;
  error: string;
}

export default memo(FormBtn);
