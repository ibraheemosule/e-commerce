import { useState, MouseEvent } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WindowIcon from "@mui/icons-material/Window";
import { useAppSelector } from "../../../../store/hooks";
import Link from "next/link";
import { signedInMenu, notSignedInMenu } from "../navbar/u_navbar";
import ButtonBase from "@mui/material/ButtonBase";
import useSignout from "../../hooks/signout/useSignout";

const btnStyle = {
  textDecoration: "none",
  color: "inherit",
  textAlign: "center",
  textTransform: "capitalize",
  fontSize: 16,
  display: "block",
  padding: ".5rem 1rem",
};

export default function UserMenu() {
  const { email } = useAppSelector(({ user }) => user.userInfo);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { signout } = useSignout();

  const openUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={openUserMenu} sx={{ px: 0, py: email ? 0 : null }}>
          {email ? (
            <Avatar
              sx={{ backgroundColor: "secondary.main", color: "primary.dark" }}
              alt="B"
              src="/static/images/avatar/2.jpg"
            />
          ) : (
            <WindowIcon
              sx={{
                backgroundColor: "primary.dark",
                color: "secondary.main",
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
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
        {(email ? signedInMenu : notSignedInMenu).map(({ name, href }) => (
          <MenuItem
            key={name}
            sx={{ padding: 0 }}
            onClick={handleCloseUserMenu}
          >
            {name === "sign out" ? (
              <ButtonBase onClick={() => void signout()} sx={btnStyle}>
                {name}
              </ButtonBase>
            ) : (
              <Link
                href={href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                  textTransform: "capitalize",
                  display: "block",
                  width: "100%",
                  padding: ".5rem 1rem",
                }}
              >
                {name}
              </Link>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
