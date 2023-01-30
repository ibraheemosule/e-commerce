import Box from "@mui/material/Box";
import { title } from "process";
import { memo } from "react";
import Carousel from "react-material-ui-carousel";
import SlideCard from "./slide-card/SlideCard";

const sliderDetails = [
  { title: "authentic leather belt", img: "/images/belts.jpg" },
  { title: "bespoke coporate shoes", img: "/images/shoe.jpg" },
  { title: "portable hand purses", img: "/images/purse.jpg" },
];

const Hero = () => {
  return (
    <>
      <Box>
        <Carousel animation="slide" indicators={false}>
          {sliderDetails.map((detail, i) => (
            <SlideCard key={i} title={detail.title} img={detail.img} />
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default memo(Hero);
