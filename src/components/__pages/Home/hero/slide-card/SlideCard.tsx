import Box from "@mui/material/Box";
import { memo } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { primaryMain } from "../../../../../utils/theme";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";

const SlideCard = () => {
  return (
    <>
      <Box
        sx={{
          height: { xs: "250px", sm: "350px", md: "calc(100vh - 300px)" },
          position: "relative",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(20,33,61,1)",
        }}
      >
        <Image
          src="/images/belts.jpg"
          alt="belt selections"
          fill={true}
          priority={true}
          style={{ objectFit: "cover", opacity: 0.25 }}
        />
        <Container
          // maxWidth={false}
          sx={{
            color: "primary.main",
            width: "max-content",
            maxWidth: "400px",
            ml: 0,
          }}
        >
          <Typography component="h3" variant="h4">
            authentic leather belt
          </Typography>

          <Box
            sx={{
              mt: "20px",
              display: "flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            <Divider
              sx={{
                display: "inline-block",
                flexGrow: 0,
                width: { xs: "100%", sm: "100%" },
                border: `1px solid ${primaryMain}`,
                borderRadius: "50% 0 0 50%",
              }}
            />
            <Box
              sx={{
                all: "unset",
                display: "inline-block",
                width: "15px",
                height: "15px",
                borderRadius: 100,
                bgcolor: "secondary.main",
                position: "absolute",
                left: "50%",

                //mb: "2px",
              }}
            ></Box>
            {/* <Divider
              sx={{
                display: "inline-block",
                flexGrow: 0,
                width: { xs: "15%", sm: "8%" },
                border: `1px solid ${primaryMain}`,
                borderRadius: " 0 50%  50% 0",
              }}
            /> */}
          </Box>
          <Box sx={{ mt: "25px" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRightAlt />}
              sx={{
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "red",
                },
              }}
            >
              Shop Here
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default memo(SlideCard);
