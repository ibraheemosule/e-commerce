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

const drawerWidth = 240,
  mainNavList = ["Home", "Corporate Shoes", "Belts", "Purses"];

export default memo(function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleDrawerToggle = () => setShowMenu(!showMenu);

  return (
    <>
      <AppBar
        position="static"
        component="section"
        elevation={0}
        sx={{
          backgroundColor: "primary.dark",
          color: "primary.main",
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              gap: "2rem",

              "& a": {
                textDecoration: "none",
                fontSize: ".8rem",
                fontWeight: "bold",
                color: "primary.main",

                "&:hover": {
                  color: "primary.light",
                },
              },
            }}
          >
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
