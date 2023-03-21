import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomAccordion from "../../../others/accordion/Accordion";
import { useState, memo } from "react";
import { points } from "./u_whyus";

export default memo(function WhyUs() {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <div id="faqs">
      <Grid
        container
        mx="auto"
        bgcolor="primary.light"
        sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 6 } }}
      >
        <Grid item xs={12}>
          <Typography
            component="h4"
            variant="h4"
            textAlign="center"
            color="secondary.main"
            textTransform="capitalize"
          >
            Why you should patronize us
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: { xs: 2, sm: 3 } }}>
          {Object.keys(points).map((point, i) => (
            <CustomAccordion
              key={i}
              expanded={expanded}
              setExpanded={setExpanded}
              id={i + 1}
              title={point}
              text={points[point as keyof typeof points]}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
});
