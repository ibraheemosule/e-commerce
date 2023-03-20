import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const LazyLoader: FC = () => (
  <Stack spacing={1} width="100%" px={3}>
    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
    <Skeleton variant="rectangular" height={50} />
    <Skeleton variant="rectangular" height={50} />
    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
  </Stack>
);

export default LazyLoader;
