import { FC, memo, useState } from "react";
import MobileNav from "./mobile-nav/MobileNav";
import DesktopNav from "./desktop-nav/DesktopNav";

const Navbar: FC<NavProps> = ({ offScreen }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <DesktopNav
        offScreen={offScreen}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <MobileNav
        offScreen={offScreen}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  );
};

interface NavProps {
  offScreen: boolean;
}

export default memo(Navbar);

// import { FC, memo, useState, MouseEvent } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import SearchBar from "../../search-bar/SearchBar";
// import UserMenu from "../user-menu/UserMenu";
// import Cart from "../cart/Cart";
// import SideNavList from "./side-nav-list/SideNavList";
// import Link from "next/link";
// import { linkWrapperStyles, productsNavStyle } from "./u_navbar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// const drawerWidth = 240,
//   mainNavList = ["home", "products", "about us", "contact"],
//   navProductsList = ["shoes", "belts", "purses"];

// const Navbar: FC<NavbarProps> = ({ offScreen }) => {
//   const [showMenu, setShowMenu] = useState(false),
//     [active, setActive] = useState(1);
//   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

//   const openUserMenu = (event: MouseEvent<HTMLElement>, i: number) => {
//     setAnchorElUser(event.currentTarget);
//     setActive(() => i + 1);
//   };

//   const handleCloseUserMenu = () => setAnchorElUser(null);

//   const handleDrawerToggle = () => setShowMenu(!showMenu);

//   return (
//     <>
//       <AppBar
//         position={offScreen ? "fixed" : "static"}
//         component="section"
//         elevation={0}
//         sx={{
//           backgroundColor: "primary.dark",
//           color: "primary.main",
//           pt: "1rem",
//         }}
//       >
//         <Toolbar
//           sx={{
//             justifyContent: "space-between",
//             width: "100%",
//             pr: 2,
//             pb: 2,
//           }}
//         >
//           <IconButton
//             color="secondary"
//             aria-label="open side menu"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{
//               display: { md: "none" },
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box sx={linkWrapperStyles(active)}>
//             {mainNavList.map((text, i) =>
//               text === "products" ? (
//                 <>
//                   <a
//                     key={text}
//                     className="nav-item"
//                     onClick={e => openUserMenu(e, i)}
//                   >
//                     {text}
//                   </a>

//                   <Menu
//                     sx={{ mt: "45px" }}
//                     elevation={3}
//                     id="menu-appbar"
//                     anchorEl={anchorElUser}
//                     anchorOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorElUser)}
//                     onClose={handleCloseUserMenu}
//                   >
//                     {navProductsList.map(product => (
//                       <MenuItem key={product} onClick={handleCloseUserMenu}>
//                         <Link style={productsNavStyle} href="/products">
//                           {product}
//                         </Link>
//                       </MenuItem>
//                     ))}
//                   </Menu>
//                 </>
//               ) : (
//                 <Link
//                   className="nav-item"
//                   onClick={() => setActive(i + 1)}
//                   key={text}
//                   href="/login"
//                 >
//                   {text}
//                 </Link>
//               )
//             )}
//           </Box>
//           <Box sx={{ display: "flex", gap: { xs: "1rem", md: "2rem" } }}>
//             <SearchBar />
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: "1rem",
//                 mr: ".5rem",
//                 color: "secondary.main",
//               }}
//             >
//               <Box sx={{ display: { xs: "none", md: "block" } }}>
//                 <UserMenu />
//               </Box>
//               <Cart />
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{
//           width: { sm: drawerWidth },
//           display: { xs: "block", sm: "none" },
//         }}
//       >
//         <SideNavList
//           showMenu={showMenu}
//           handleDrawerToggle={handleDrawerToggle}
//         />
//       </Box>
//     </>
//   );
// };

// interface NavbarProps {
//   offScreen: boolean;
// }
// export default memo(Navbar);
