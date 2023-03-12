import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomAccordion from "../../../others/accordion/Accordion";
import { useState, memo } from "react";

const a = ["d", "d", "d"];

export default memo(function Faqs() {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <div id="faqs">
      <Grid
        container
        mx="auto"
        bgcolor="primary.light"
        sx={{ pt: { xs: 4, sm: 6 } }}
      >
        <Grid item xs={12}>
          <Typography
            component="h4"
            variant="h4"
            textAlign="center"
            color="secondary.main"
          >
            Frequently Asked Questions
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: { xs: 2, sm: 3 } }}>
          {a.map((val, i) => (
            <CustomAccordion
              key={i}
              expanded={expanded}
              setExpanded={setExpanded}
              id={i + 1}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
});
