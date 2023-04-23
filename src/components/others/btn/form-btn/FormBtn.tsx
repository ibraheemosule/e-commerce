import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoaderIcon from "../../LoaderIcon";
import { FC, memo } from "react";
import Btn from "../Btn";
import ButtonBase from "@mui/material/ButtonBase";

const FormBtn: FC<FormBtnProps> = ({
  btnSize,
  text,
  error,
  loading,
  onCancel,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "inherit",
        alignItems: "center",
        position: "relative",
        pt: 3,
        gap: 3,
      }}
    >
      <Btn
        disabled={loading}
        size={btnSize}
        sx={{
          px: 6,
        }}
        type="submit"
      >
        {loading ? <LoaderIcon size={24} /> : text}
      </Btn>
      {onCancel ? (
        <ButtonBase
          onClick={onCancel}
          sx={{
            fontSize: 16,
            color: "secondary.main",
            "&:hover": {
              color: "secondary.dark",
            },
          }}
        >
          Cancel
        </ButtonBase>
      ) : null}

      <Typography
        className="error-msg"
        sx={{
          position: "absolute",
          whiteSpace: "nowrap",
          overflow: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
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
  error: string | undefined;
  loading?: boolean;
  onCancel?: () => void;
}

export default memo(FormBtn);
