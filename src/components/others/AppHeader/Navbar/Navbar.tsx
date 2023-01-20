import { memo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";
import Cart from "../Cart/Cart";
import SideNavList from "./SideNavList/SideNavList";
import Link from "next/link";
import useScrollToTrigger from "@mui/material/useScrollTrigger";
import { linkWrapperStyles } from "./s_navbar";

const drawerWidth = 240,
  mainNavList = ["Home", "Corporate Shoes", "Belts", "Purses"];

export default memo(function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const trigger = useScrollToTrigger({
    threshold: 150,
    disableHysteresis: true,
  });

  const handleDrawerToggle = () => setShowMenu(!showMenu);

  return (
    <>
      <AppBar
        position={trigger ? "fixed" : "static"}
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
            color="inherit"
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
              <Link key={text} href="/">
                {text}
              </Link>
            ))}
            <Link href="/about">About</Link>
          </Box>
          <Box sx={{ display: "flex", gap: { xs: "1rem", md: "2rem" } }}>
            <SearchBar />
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                mr: ".5rem",
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
});
