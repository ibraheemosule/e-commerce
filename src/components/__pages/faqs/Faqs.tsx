import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "../../others/accordion/Accordion";
import { useState, memo } from "react";
import { faqs } from "./u_faqs";
import Container from "@mui/material/Container";

export default memo(function Faqs() {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
      <Container sx={{ bgcolor: "primary.light", p: 3 }}>
        <Grid container mx="auto" sx={{ py: 3 }}>
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
            {faqs.map(({ question, answer }, i) => (
              <Accordion
                key={i}
                expanded={expanded}
                setExpanded={setExpanded}
                id={i + 1}
                title={question}
                text={answer}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
});
