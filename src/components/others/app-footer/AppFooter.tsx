import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Link from "next/link";
import { StyledListItem, customerService } from "./u_appFooter";
import ContactForm from "../contact-form/ContactForm";
import SocialContacts from "../social-contacts/SocialContacts";

const AppFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        boxShadow: "1px -15px 18px -21px rgba(0,0,0,0.56)",
        color: "primary.main",
        py: { xs: "2rem", sm: "3rem" },
      }}
    >
      <Container id="contact" maxWidth="lg">
        <Grid container justifyContent="space-between" rowGap={6}>
          <Grid item xs={12} sm={4} lg={3.5}>
            <ContactForm bg="dark" maxWidth="25ch" />
          </Grid>
          <Grid item xs={12} sm={3.5} lg={3}>
            <Typography
              component="h4"
              variant="h5"
              mt={2}
              color="secondary.main"
            >
              Customer Service
            </Typography>
            <List aria-labelledby="cutomer service">
              {customerService.map(({ name, href }) => (
                <StyledListItem key={name}>
                  <Link href={href}>{name}</Link>
                </StyledListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={3.5} lg={3}>
            <Typography
              component="h4"
              variant="h5"
              mt={2}
              color="secondary.main"
            >
              Contact Us
            </Typography>
            <Box sx={{ display: "inline-flex", mt: 2 }}>
              <SocialContacts />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppFooter;
