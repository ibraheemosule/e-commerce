import Box from "@mui/system/Box";
import { memo } from "react";
import Typography from "@mui/material/Typography";

export default memo(function Subtitle({ title, text }: DetailProp) {
  return (
    <Box sx={{ mt: 2, textTransform: title === "email" ? "" : "capitalize" }}>
      <Typography
        sx={{
          color: "secondary.dark",
          fontSize: 14,
        }}
      >
        {title}
      </Typography>
      <Typography>{text}</Typography>
    </Box>
  );
});

interface DetailProp {
  title: string;
  text: string;
}
