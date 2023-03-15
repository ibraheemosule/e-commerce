import { FC, memo } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { StyledListItem, productLinkStyle } from "./u_sideNavList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import ShoesIcon from "@mui/icons-material/DoNotStep";
import Link from "next/link";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AboutIcon from "@mui/icons-material/PsychologyAlt";
import ContactIcon from "@mui/icons-material/Call";
import navWrapper from "../wrapper/wrapper";
import { NavbarProps } from "../wrapper/wrapper";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../../../../store/hooks";
import {
  drawerWidth,
  mainNavList,
  signedInMenu,
  notSignedInMenu,
  navProductsList,
} from "../u_navbar";

const Nav: FC<NavbarProps> = (props) => {
  const { signin } = useAppSelector((state) => state.user);
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        display: { xs: "block", sm: "none" },
      }}
    >
      <Drawer
        open={props.showMenu}
        onClose={() => props.setShowMenu((val) => !val)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <div>
          <Toolbar sx={{ backgroundColor: "primary.dark" }}>
            <Image src="/images/logo.png" alt="logo" width={100} height={25} />
          </Toolbar>
          <Divider />
          <List>
            {mainNavList.map((text) => (
              <StyledListItem key={text} disablePadding>
                {
                  // text === "products" ? (
                  //   <>
                  //     <a key={text} onClick={e => props.openUserMenu(e)}>
                  //       <ListItemButton>
                  //         <ListItemIcon>
                  //           <ShoesIcon />
                  //         </ListItemIcon>
                  //         <ListItemText primary={text} />
                  //       </ListItemButton>
                  //     </a>

                  //     <Menu
                  //       sx={{ mt: "10px" }}
                  //       elevation={3}
                  //       id="menu-appbar"
                  //       anchorEl={props.anchorElUser}
                  //       anchorOrigin={{
                  //         vertical: "top",
                  //         horizontal: "right",
                  //       }}
                  //       keepMounted
                  //       transformOrigin={{
                  //         vertical: "top",
                  //         horizontal: "right",
                  //       }}
                  //       open={Boolean(props.anchorElUser)}
                  //       onClose={props.handleCloseUserMenu}
                  //     >
                  //       {navProductsList.map(product => (
                  //         <MenuItem
                  //           key={product}
                  //           onClick={props.handleCloseUserMenu}
                  //         >
                  //           <Link style={productLinkStyle} href="/products">
                  //             {product}
                  //           </Link>
                  //         </MenuItem>
                  //       ))}
                  //     </Menu>
                  //   </>
                  // ) :
                  <Link
                    href={
                      text === "home"
                        ? "/"
                        : text === "products"
                        ? "/products"
                        : `/#${text}`
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {
                          {
                            home: <HomeIcon />,
                            about: <AboutIcon />,
                            contact: <ContactIcon />,
                            products: <ShoesIcon />,
                          }[text]
                        }
                      </ListItemIcon>

                      <ListItemText primary={text} />
                    </ListItemButton>
                  </Link>
                }
              </StyledListItem>
            ))}
          </List>
          <Divider />
          <List>
            {(signin ? signedInMenu : notSignedInMenu).map(
              ({ name, href, Icon }) => (
                <StyledListItem key={name} disablePadding>
                  <Link href={href}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>

                      <ListItemText primary={name} />
                    </ListItemButton>
                  </Link>
                </StyledListItem>
              )
            )}
          </List>
        </div>
      </Drawer>
    </Box>
  );
};

const MobileNav = navWrapper(Nav);

export default memo(MobileNav);
