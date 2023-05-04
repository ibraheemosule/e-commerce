import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Box from "@mui/material/Box";
import SocialContacts from "../../others/social-contacts/SocialContacts";
import ContactForm from "../../others/contact-form/ContactForm";

export default memo(function Contact() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
      <Container
        sx={{
          bgcolor: "primary.light",
          px: { xs: 4, sm: 6, md: 3 },
          py: 6,
        }}
      >
        <Grid container mx="auto">
          <Grid item xs={12} sm={5} mx="auto" mt={2}>
            <Box>
              <Typography component="h1" variant="h3" color="secondary.main">
                Let&apos;s talk about everything
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                aspectRatio: "4/3",
                mt: { xs: 4, sm: 2 },
              }}
            >
              <Image src="./images/undraw-contact.svg" alt="size" fill />
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} mx="auto" mt={2}>
            <Typography sx={{ mt: 1 }}>
              Drop us a message or contact us on any of the social media options
              below the form. We respond within 24 hours.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <ContactForm />
            </Box>

            <Box sx={{ mt: 4 }}>
              <SocialContacts />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
});
