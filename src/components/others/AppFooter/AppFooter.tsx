import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import InputField from "../InputField/InputField";
import Link from "next/link";
import { StyledListItem } from "./u_appFooter";

const AppFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        boxShadow: "1px -15px 18px -21px rgba(0,0,0,0.56)",
        color: "primary.main",
        mt: "3rem",
        py: { xs: "2rem", sm: "3rem" },
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={12} sm={5} lg={4}>
            <Typography
              component="h4"
              variant="h5"
              color="secondary.main"
              mt={2}
            >
              Contact Form
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Box>
                <InputField darkBg="dark" placeholder="Full Name" />
              </Box>
              <Box>
                <InputField darkBg="dark" placeholder="Email" />
              </Box>
              <Box>
                <InputField
                  darkBg="dark"
                  placeholder="Message"
                  textarea={true}
                />
              </Box>
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
                <Link href="/about">faqs </Link>
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
              <StyledListItem sx={{ mr: 3, color: "#1877F2" }}>
                <Link href="/about">
                  <Facebook />
                </Link>
              </StyledListItem>
              <StyledListItem sx={{ mr: 3, color: "#1DA1F2" }}>
                <Link href="/about">
                  <Twitter />
                </Link>
              </StyledListItem>
              <StyledListItem sx={{ mr: 3, color: "#E4405F" }}>
                <Link href="/about">
                  <Instagram />
                </Link>
              </StyledListItem>
              <StyledListItem sx={{ mr: 3, color: "#00C300" }}>
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