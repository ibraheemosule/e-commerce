import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FC, memo } from "react";

const SelectField: FC<SelectFieldProps> = (props) => {
  const {
    selectValue,
    setSelectValue,
    options,
    title,
    enableReset = true,
  } = props;

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: 100, margin: 0 }}>
        <InputLabel id="demo-simple-select-standard-label">{title}</InputLabel>
        <Select
          sx={{ textTransform: "capitalize" }}
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          label={title}
        >
          {enableReset && (
            <MenuItem value="">
              <b>
                <em>None</em>
              </b>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem
              sx={{ textTransform: "capitalize" }}
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

interface SelectFieldProps {
  selectValue: string;
  setSelectValue: (value: string) => void;
  options: (string | number)[];
  title: string;
  enableReset?: boolean;
}

export default memo(SelectField);
