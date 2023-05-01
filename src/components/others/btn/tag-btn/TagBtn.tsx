import { memo } from "react";
import ButtonBase from "@mui/material/ButtonBase";

export default memo(function TagBtn(props: TagBtnProps) {
  return (
    <ButtonBase
      disabled={props.disabled}
      onClick={props.onClick}
      sx={{
        border: "1px solid lightgray",
        fontSize: 16,
        textTransform: "capitalize",
        color: props.disabled ? "primary.main" : "secondary.light",
        padding: ".2rem .5rem",
        marginRight: "20px",

        "&:hover": {
          color: "secondary.dark",
          borderColor: "wheat",
        },
      }}
    >
      {props.text}
    </ButtonBase>
  );
});

interface TagBtnProps {
  onClick: () => void;
  text: string | number;
  disabled?: boolean;
}
