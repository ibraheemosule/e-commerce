import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import InputField from "../input-field/InputField";
import Link from "next/link";
import { StyledListItem } from "./u_appFooter";
import Btn from "../btn/Btn";

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
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" rowGap={6}>
          <Grid item xs={12} sm={4} lg={3.5}>
            <Typography
              component="h4"
              variant="h5"
              color="secondary.main"
              mt={2}
            >
              Contact Form
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Box sx={{ maxWidth: "25ch" }}>
                <InputField darkBg="dark" placeholder="Full Name" />
              </Box>
              <Box sx={{ maxWidth: "25ch" }}>
                <InputField darkBg="dark" placeholder="Email" />
              </Box>
              <Box sx={{ maxWidth: "25ch" }}>
                <InputField
                  darkBg="dark"
                  placeholder="Message"
                  textarea={true}
                />
              </Box>
              <Btn
                sx={{
                  mt: 2,
                  px: 3,
                }}
              >
                Submit
              </Btn>
            </Box>
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
              <StyledListItem>
                <Link href="/#faq">faqs </Link>
              </StyledListItem>
              <StyledListItem>
                <Link href="/about">return policy</Link>
              </StyledListItem>
              <StyledListItem>
                <Link href="/about">size guide </Link>
              </StyledListItem>
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
              <StyledListItem sx={{ mr: { xs: 2, md: 3 }, color: "#1877F2" }}>
                <Link href="/about">
                  <Facebook />
                </Link>
              </StyledListItem>
              <StyledListItem sx={{ mr: { xs: 2, md: 3 }, color: "#1DA1F2" }}>
                <Link href="/about">
                  <Twitter />
                </Link>
              </StyledListItem>
              <StyledListItem sx={{ mr: { xs: 2, md: 3 }, color: "#E4405F" }}>
                <Link href="/about">
                  <Instagram />
                </Link>
              </StyledListItem>
              <StyledListItem sx={{ mr: { xs: 2, md: 3 }, color: "#00C300" }}>
                <Link href="/about">
                  <Phone />
                </Link>
              </StyledListItem>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppFooter;
