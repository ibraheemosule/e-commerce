import Box from "@mui/material/Box";
import { FC, memo } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { primaryMain } from "../../../../../utils/theme";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";

const SlideCard: FC<SlideCardProps> = ({ title, img }) => {
  return (
    <>
      <Box
        sx={{
          height: { xs: "250px", sm: "350px", md: "calc(100vh - 300px)" },
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "rgba(20,33,61,1)",
        }}
      >
        <Image
          src={img}
          alt="belt selections"
          fill={true}
          sizes="
          100vw"
          priority={true}
          style={{ objectFit: "cover", opacity: 0.25 }}
        />
        <Container
          sx={{
            color: "primary.main",
            width: "max-content",
            position: "absolute",
            bottom: "20%",
          }}
        >
          <Typography
            component="h3"
            variant="h4"
            sx={{ textTransform: "capitalize" }}
          >
            {title}
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
                borderRadius: "50%",
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
                transform: "translate(-50%)",
              }}
            />
          </Box>
          <Box sx={{ mt: "25px" }}>
            <Button
              variant="contained"
              endIcon={<ArrowRightAlt />}
              sx={{
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.dark",
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

interface SlideCardProps {
  title: string;
  img: string;
}

export default memo(SlideCard);
