import { incremented } from "../../../store/features/counter/counter-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Hero from "./hero/Hero";

export default function Home() {
  const counter = useAppSelector((state) => state.counter.value),
    dispatch = useAppDispatch();

  return (
    <>
      <div>Welcome to next.js</div>
      <Hero />
      <Container maxWidth="lg">
        <Box bgcolor="primary.main" sx={{ minHeight: "10px" }}>
          <>
            {counter}
            <button onClick={() => dispatch(incremented())}> increase</button>
          </>
        </Box>
      </Container>
    </>
  );
}
