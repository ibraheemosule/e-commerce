import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, Dispatch, SetStateAction, memo, ReactElement } from "react";

const CustomAccordion: FC<CustomAccordionProps> = (props) => {
  const { expanded, setExpanded, id, title, text, children } = props;

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
          <Typography
            component="h5"
            sx={{ fontWeight: "500", textTransform: "capitalize" }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!children ? <Typography>{text}</Typography> : children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

interface CustomAccordionProps {
  expanded: number | boolean;
  setExpanded: Dispatch<SetStateAction<false | number>>;
  id: number;
  title: string | ReactElement;
  text?: string;
  children?: ReactElement;
}

export default memo(CustomAccordion);
