import { useTransition, TransitionFn } from "@react-spring/web";

interface FadeProps {
  opacity: number;
}

type FadeTransitionFn = <T>(
  list: T,
  leave?: boolean
) => TransitionFn<T, FadeProps>;

const useFade: FadeTransitionFn = (list, leave) => {
  return useTransition(list, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: leave && { opacity: 0 },
    config: {
      duration: leave ? 500 : 300,
    },
  });
};

export default useFade;
