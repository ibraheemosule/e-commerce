import { FC, memo, SetStateAction } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import { StyledListItem } from "./s_sideNavList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";

const drawerWidth = 240;
const mainNavList = ["Home", "Corporate Shoes", "Belts", "Purses"];
const userNavList = ["Profile", "Account", "Sign In"];

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
          {mainNavList.map((text, index) => (
            <StyledListItem key={text} disablePadding>
              <Link href="/">
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>

                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </StyledListItem>
          ))}
        </List>
        <Divider />
        <List>
          {userNavList.map((text, index) => (
            <StyledListItem key={text} disablePadding>
              <Link href="/about">
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
