import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, Dispatch, SetStateAction, memo } from "react";

const CustomAccordion: FC<CustomAccordionProps> = ({
  expanded,
  setExpanded,
  id,
}) => {
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === id}
        onChange={handleChange(id)}
        sx={{ backgroundColor: "unset", color: "primary.dark" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="h6" sx={{ fontWeight: "500" }}>
            General settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

interface CustomAccordionProps {
  expanded: number | boolean;
  setExpanded: Dispatch<SetStateAction<false | number>>;
  id: number;
}

export default memo(CustomAccordion);
