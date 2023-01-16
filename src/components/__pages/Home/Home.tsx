import { incremented } from "../../../store/features/counter/counter-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Box from "@mui/material/Box";

export default function Home() {
  const counter = useAppSelector((state) => state.counter.value),
    dispatch = useAppDispatch();

  return (
    <>
      <div>Welcome to next.js</div>
      <Box bgcolor="primary.main">
        <>
          {counter}
          <button onClick={() => dispatch(incremented())}> increase</button>
        </>
      </Box>
    </>
  );
}
