import { useSignoutMutation } from "../../../../store/features/new-user/new-user-slice";
import { useAppDispatch } from "../../../../store/hooks";
import { userDefaultState } from "../../../../store/features/user/user-slice";
import { resetState } from "../../../../store/features/user/user-slice";
import { useEffect } from "react";
import { persistor } from "../../../../store/store";
import Router from "next/router";
import { toast } from "react-toastify";
const useSignout = () => {
  const [signout, { data, error, isError, isSuccess }] = useSignoutMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      if (isSuccess) {
        await Router.push("/");
        toast("Sign out successful", {
          type: "success",
        });

        dispatch(resetState(userDefaultState));
        await persistor.flush();
      }
      if (isError) {
        toast("Sign out unsuccessful", { type: "error" });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return { signout, error, data };
};

export default useSignout;
