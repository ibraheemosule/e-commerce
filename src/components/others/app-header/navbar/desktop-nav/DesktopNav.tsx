import { FC, Children } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../../search-bar/SearchBar";
import UserMenu from "../../user-menu/UserMenu";
import Cart from "../../cart/Cart";
import Link from "next/link";
import { linkWrapperStyles, productsNavStyle } from "../u_navbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import navWrapper, { NavbarProps } from "../wrapper/wrapper";
import { mainNavList, navProductsList } from "../u_navbar";

const Nav: FC<NavbarProps> = (props) => {
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
          <Box sx={linkWrapperStyles(props.active)}>
            {Children.toArray(
              mainNavList.map((text, i) =>
                text === "products" ? (
                  <>
                    <a
                      key={text}
                      className="nav-item"
                      onClick={(e) => props.openUserMenu(e, i)}
                    >
                      {text}
                    </a>

                    <Menu
                      sx={{ mt: "45px" }}
                      elevation={3}
                      id="menu-appbar"
                      anchorEl={props.anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(props.anchorElUser)}
                      onClose={props.handleCloseUserMenu}
                    >
                      {navProductsList.map((product) => (
                        <MenuItem
                          key={product}
                          onClick={props.handleCloseUserMenu}
                        >
                          <Link style={productsNavStyle} href="/products">
                            {product}
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link
                    className="nav-item"
                    onClick={() => props.setActive(i + 1)}
                    key={text}
                    href={text === "home" ? "/" : `/#${text}`}
                  >
                    {text}
                  </Link>
                )
              )
            )}
          </Box>
          <Box sx={{ display: "flex", gap: { xs: "1rem", md: "2rem" } }}>
            <SearchBar />
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                mr: ".5rem",
                color: "secondary.main",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <UserMenu />
              </Box>
              <Cart />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

const DesktopNav = navWrapper(Nav);

export default DesktopNav;