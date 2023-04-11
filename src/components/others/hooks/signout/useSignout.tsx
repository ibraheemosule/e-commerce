import { useSignoutMutation } from "../../../../store/features/new-user/new-user-slice";
import { useAppDispatch } from "../../../../store/hooks";
import { userDefaultState } from "../../../../store/features/user/user-slice";
import { resetState } from "../../../../store/features/user/user-slice";
import { useEffect } from "react";
import { persistor } from "../../../../store/store";
import Router from "next/router";
import { successPopup, errorPopup } from "../../../../utils/utilsFunctions";
const useSignout = () => {
  const [signout, { data, error, isError, isSuccess }] = useSignoutMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      if (isSuccess) {
        await Router.push("/");
        successPopup("Sign out successful");

        dispatch(resetState(userDefaultState));
        await persistor.flush();
      }
      if (isError) {
        errorPopup("Sign out unsuccessful");
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return { signout, error, data };
};

export default useSignout;
