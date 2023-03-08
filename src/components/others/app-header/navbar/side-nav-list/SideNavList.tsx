import { FC, memo, SetStateAction, useState, MouseEvent } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { StyledListItem, productLinkStyle } from "./u_sideNavList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import AccountIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ShoesIcon from "@mui/icons-material/DoNotStep";
import Link from "next/link";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AboutIcon from "@mui/icons-material/PsychologyAlt";
import ContactIcon from "@mui/icons-material/Call";
import navWrapper from "../wrapper/wrapper";

const drawerWidth = 240;
const mainNavList = ["home", "products", "about", "contact"];
const userNavList = ["profile", "account", "login", "logout"],
  navProductsList = ["shoes", "belts", "purses"];

const SideNavList: FC<ISideNavList> = ({ showMenu, handleDrawerToggle }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const openUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);
  return (
    <Drawer
      open={showMenu}
      onClose={handleDrawerToggle}
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
              {text === "products" ? (
                <>
                  <a key={text} onClick={(e) => openUserMenu(e)}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ShoesIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </a>

                  <Menu
                    sx={{ mt: "10px" }}
                    elevation={3}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {navProductsList.map((product) => (
                      <MenuItem key={product} onClick={handleCloseUserMenu}>
                        <Link style={productLinkStyle} href="/products">
                          {product}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Link href="/">
                  <ListItemButton>
                    <ListItemIcon>
                      {
                        {
                          home: <HomeIcon />,
                          "about us": <AboutIcon />,
                          "contact us": <ContactIcon />,
                        }[text]
                      }
                    </ListItemIcon>

                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              )}
            </StyledListItem>
          ))}
        </List>
        <Divider />
        <List>
          {userNavList.map((text) => (
            <StyledListItem key={text} disablePadding>
              <Link href="/about">
                <ListItemButton>
                  <ListItemIcon>
                    {
                      {
                        account: <AccountIcon />,
                        profile: <PersonIcon />,
                        login: <LoginIcon />,
                        logout: <LogoutIcon />,
                      }[text]
                    }
                  </ListItemIcon>

                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </StyledListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

interface ISideNavList {
  showMenu: boolean;
  handleDrawerToggle: () => SetStateAction<void>;
}

export default memo(SideNavList);
