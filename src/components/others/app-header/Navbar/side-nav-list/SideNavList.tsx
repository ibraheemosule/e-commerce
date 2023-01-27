import { FC, memo, SetStateAction } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { StyledListItem } from "./u_sideNavList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import AccountIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BeltsIcon from "@mui/icons-material/Commit";
import ShoesIcon from "@mui/icons-material/DoNotStep";
import PursesIcon from "@mui/icons-material/BusinessCenter";
import Link from "next/link";

const drawerWidth = 240;
const mainNavList = ["Home", "Shoes", "Belts", "Purses"];
const userNavList = ["Profile", "Account", "Login", "Logout"];

const SideNavList: FC<ISideNavList> = ({ showMenu, handleDrawerToggle }) => {
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
        <Toolbar />
        <Divider />
        <List>
          {mainNavList.map((text) => (
            <StyledListItem key={text} disablePadding>
              <Link href="/">
                <ListItemButton>
                  <ListItemIcon>
                    {
                      {
                        Home: <HomeIcon />,
                        Shoes: <ShoesIcon />,
                        Belts: <BeltsIcon />,
                        Purses: <PursesIcon />,
                      }[text]
                    }
                  </ListItemIcon>

                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
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
                        Account: <AccountIcon />,
                        Profile: <PersonIcon />,
                        Login: <LoginIcon />,
                        Logout: <LogoutIcon />,
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
