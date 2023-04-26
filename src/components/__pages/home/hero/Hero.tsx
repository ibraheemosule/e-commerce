import Box from "@mui/material/Box";

import { memo } from "react";
import Carousel from "react-material-ui-carousel";
import SlideCard from "./slide-card/SlideCard";

const sliderDetails = [
  { title: "authentic leather belt", img: "/images/belts.jpg", tag: "belt" },
  { title: "bespoke coporate shoes", img: "/images/shoe.jpg", tag: "shoe" },
  { title: "portable hand purses", img: "/images/purse.jpg", tag: "bag" },
];

const Hero = () => {
  return (
    <>
      <Box>
        <Carousel animation="slide" indicators={false}>
          {sliderDetails.map((detail, i) => (
            <SlideCard
              tag={detail.tag}
              key={i}
              title={detail.title}
              img={detail.img}
            />
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default memo(Hero);
