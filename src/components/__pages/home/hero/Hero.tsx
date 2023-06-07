import Box from "@mui/material/Box";
import { memo } from "react";
import Carousel from "react-material-ui-carousel";
import SlideCard from "./slide-card/SlideCard";

const sliderDetails = [
  { title: "authentic leather belt", img: "/images/belt.jpg", tag: "belt" },
  { title: "bespoke coporate shoes", img: "/images/shoe.jpg", tag: "shoe" },
  { title: "portable hand purses", img: "/images/purse.jpg", tag: "bag" },
];

const Hero = () => (
  <Box>
    <Carousel animation="slide" indicators={false}>
      {sliderDetails.map(({ title, tag, img }, i) => (
        <SlideCard tag={tag} key={i} title={title} img={img} />
      ))}
    </Carousel>
  </Box>
);

export default memo(Hero);
