import Box from "@mui/material/Box";
import { ReactElement, useEffect } from "react";
import AppHeader from "./app-header/AppHeader";
import AppFooter from "./app-footer/AppFooter";
import dynamic from "next/dynamic";
import useFade from "./hooks/fade-transition/useFade";
import { useRouter } from "next/router";
import { animated } from "@react-spring/web";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCall } from "../../lib/contentful/contentful";
import { allProductsQuery } from "../../lib/contentful/query";
import { CmsAllProductsType } from "../../utils/ts-types/contentful-types";
import {
  setProductsList,
  setFetching,
} from "../../store/features/product/product-slice";
interface ILayout {
  children: ReactElement;
}

function Layout({ children }: ILayout) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = router.pathname;
  const fade = useFade<string>(path);
  const { immutableProducts } = useAppSelector(({ product }) => product);

  useEffect(() => {
    if (!immutableProducts.length) {
      void (async () => {
        dispatch(setFetching(true));

        const { data } = (await fetchCall(
          allProductsQuery
        )) as CmsAllProductsType;

        if (!data?.productCollection) {
          dispatch(setFetching(false));
          return;
        }

        const formatData = data.productCollection.items.map((item) => {
          item.id = item.sys?.id;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { sys, ...rest } = item;
          return rest;
        });

        dispatch(setFetching(false));
        dispatch(setProductsList(formatData));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      className="layout"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "primary.dark",
      }}
    >
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={500}
        draggable={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="colored"
        style={{
          maxWidth: 250,
          marginLeft: "auto",
          padding: 0,
          textTransform: "capitalize",
          fontSize: 13,
        }}
      />
      <Box
        component="header"
        sx={{
          boxShadow: 2,
        }}
      >
        <AppHeader />
      </Box>
      {fade((props, item) => (
        <animated.div key={item} style={{ flexGrow: 1, ...props }}>
          <Box component="main" sx={{ bgcolor: "primary.main" }}>
            {children}
          </Box>
        </animated.div>
      ))}

      <Box component="footer">
        <AppFooter />
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
