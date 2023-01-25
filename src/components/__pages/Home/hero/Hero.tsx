import Box from "@mui/material/Box";
import { memo } from "react";
import Carousel from "react-material-ui-carousel";
import SlideCard from "./slide-card/SlideCard";

const items = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
  },
];

const Hero = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "rgba(20,33,61,0.5)" }}>
        <SlideCard />
      </Box>
    </>
  );
};

export default memo(Hero);
