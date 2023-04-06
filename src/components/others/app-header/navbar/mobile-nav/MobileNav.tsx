import { FC, memo } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { StyledListItem } from "./u_mobileNav";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import ShoesIcon from "@mui/icons-material/DoNotStep";
import Link from "next/link";
import Image from "next/image";
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
} from "../u_navbar";
import useSignout from "../../../hooks/signout/useSignout";
import ButtonBase from "@mui/material/ButtonBase";

const Nav: FC<NavbarProps> = (props) => {
  const { email } = useAppSelector(({ user }) => user.userInfo);
  const { signout } = useSignout();

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
          <Toolbar sx={{ backgroundColor: "primary.dark", py: 1 }}>
            <Image
              src="/images/logo.png"
              alt="logo"
              height={50}
              width={70}
              quality={100}
              priority
              style={{ objectFit: "cover" }}
            />
          </Toolbar>
          <Divider />
          <List>
            {mainNavList.map((text) => (
              <StyledListItem key={text} disablePadding>
                {
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
            {(email ? signedInMenu : notSignedInMenu).map(
              ({ name, href, Icon }) => (
                <StyledListItem key={name} disablePadding>
                  {name === "sign out" ? (
                    <ButtonBase
                      onClick={() => void signout()}
                      style={{ all: "unset", width: "100%" }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>

                        <ListItemText primary={name} />
                      </ListItemButton>
                    </ButtonBase>
                  ) : (
                    <Link href={href}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>

                        <ListItemText primary={name} />
                      </ListItemButton>
                    </Link>
                  )}
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
