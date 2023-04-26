import { FC, Children, useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../../search-bar/SearchBar";
import UserMenu from "../../user-menu/UserMenu";
import CartIcon from "../../cart-icon/CartIcon";
import Link from "next/link";
import { linkWrapperStyles } from "../u_navbar";
import navWrapper, { NavbarProps } from "../wrapper/wrapper";
import { mainNavList } from "../u_navbar";
import { useAppSelector } from "../../../../../store/hooks";
import { useRouter } from "next/router";

const Nav: FC<NavbarProps> = (props) => {
  const { immutableProducts } = useAppSelector(({ product }) => product);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const activeRoute = useMemo(() => {
    const path = router.asPath.substring(1).split("#");
    const activePath = path[path.length - 1];
    return activePath === "" ? "home" : activePath;
  }, [router.asPath]);

  const filteredProducts = useMemo(
    () =>
      immutableProducts.filter((prod) =>
        prod.name.toLowerCase().startsWith(search.toLowerCase())
      ),
    [immutableProducts, search]
  );

  return (
    <>
      <AppBar
        position={props.offScreen ? "fixed" : "static"}
        component="section"
        elevation={0}
        sx={{
          backgroundColor: "primary.dark",
          color: "primary.main",
          pt: "1rem",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            pr: 2,
            pb: 2,
          }}
        >
          <IconButton
            color="secondary"
            aria-label="open side menu"
            edge="start"
            onClick={() => props.setShowMenu((val) => !val)}
            sx={{
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={linkWrapperStyles(activeRoute)}>
            {Children.toArray(
              mainNavList.map((text) => (
                <Link
                  className="nav-item"
                  // onClick={() => props.setActive(activeRouteIndex)}
                  key={text}
                  href={
                    text === "home"
                      ? "/"
                      : text === "products"
                      ? "/products"
                      : `/#${text}`
                  }
                >
                  {text}
                </Link>
              ))
            )}
          </Box>
          <Box sx={{ display: "flex", gap: { xs: "1rem", md: "2rem" } }}>
            <SearchBar
              products={filteredProducts}
              searchValue={search}
              setSearchValue={setSearch}
              type={true}
            />
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                mr: ".5rem",
                color: "secondary.main",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <UserMenu signin={props.signin} />
              </Box>
              <CartIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

const DesktopNav = navWrapper(Nav);

export default DesktopNav;
