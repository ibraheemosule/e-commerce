import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoaderIcon from "../LoaderIcon";
import { FC, memo } from "react";
import Btn from "../btn/Btn";

const FormBtn: FC<FormBtnProps> = ({ btnSize, text, error, loading }) => {
  return (
    <Box sx={{ display: "block", position: "relative" }}>
      <Btn
        disabled={loading}
        size={btnSize}
        sx={{
          mt: { xs: 5, sm: 3 },
          px: 6,
        }}
        type="submit"
      >
        {loading ? <LoaderIcon size={22} /> : text}
      </Btn>
      <Typography
        sx={{
          position: "absolute",
          textAlign: "center",
          width: "100%",
          cursor: loading ? "not-allowed" : "pointer",
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
  loading?: boolean;
}

export default memo(FormBtn);
