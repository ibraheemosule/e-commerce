import { FC, ReactElement, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const Fade: FC<PropType> = ({ children, from = {}, to = [] }) => {
  useEffect(() => console.log(to));
  const styles = useSpring({
    from: { opacity: "0", ...from },
    to: to.length ? to : { opacity: 1 },
    config: { duration: 500 },
  });
  return <animated.div style={styles}>{children}</animated.div>;
};

type PropType = {
  children: ReactElement;
  from?: Record<string, string>;
  to?: Record<string, string>[];
};

export default Fade;
