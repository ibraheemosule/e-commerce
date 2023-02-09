import Box from "@mui/system/Box";
import { Dispatch, FC, memo, SetStateAction } from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const Quantity: FC<QuantityProps> = ({ quantity, setQuantity }) => (
  <Box
    sx={{
      alignSelf: "flex-end",
      color: "primary.dark",
    }}
  >
    <strong style={{ marginRight: 12 }}>Quantity:</strong>
    <ButtonGroup
      variant="outlined"
      disableElevation
      aria-label="select product quantity"
      size="small"
      disableRipple
      sx={{ mt: 2 }}
    >
      <Button
        onClick={() => setQuantity((prev) => prev - 1)}
        disabled={quantity === 1 ? true : false}
        sx={{
          border: "1px solid",
          borderRight: 0,
          color: "primary.dark",
          borderColor: "primary.main",

          "&:hover": {
            borderRight: 0,
            borderColor: "primary.main",
            transform: "translate(1px)",
          },
        }}
      >
        -
      </Button>
      <Button
        disabled
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderWidth: "0 1px 0 1px",
          width: 20,
        }}
      >
        {quantity}
      </Button>
      <Button
        onClick={() => setQuantity((prev) => prev + 1)}
        disabled={quantity === 50 ? true : false}
        sx={{
          border: "1px solid",
          borderLeft: 1,
          color: "primary.dark",
          borderColor: "primary.main",

          "&:hover": {
            transform: "translate(-1px)",
          },
        }}
      >
        +
      </Button>
    </ButtonGroup>
  </Box>
);

interface QuantityProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export default memo(Quantity);
