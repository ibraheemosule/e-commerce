import { FC, memo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../search-bar/SearchBar";
import UserMenu from "../user-menu/UserMenu";
import Cart from "../cart/Cart";
import SideNavList from "./side-nav-list/SideNavList";
import Link from "next/link";

import { linkWrapperStyles } from "./u_navbar";

const drawerWidth = 240,
  mainNavList = ["Home", "Shoes", "Belts", "Purses"];

const Navbar: FC<NavbarProps> = ({ offScreen }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDrawerToggle = () => setShowMenu(!showMenu);

  return (
    <>
      <AppBar
        position={offScreen ? "fixed" : "static"}
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
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={linkWrapperStyles}>
            {mainNavList.map((text) => (
              <Link key={text} href="/login">
                {text}
              </Link>
            ))}
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
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          display: { xs: "block", sm: "none" },
        }}
      >
        <SideNavList
          showMenu={showMenu}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
    </>
  );
};

interface NavbarProps {
  offScreen: boolean;
}
export default memo(Navbar);
