import AccountIcon from "@mui/icons-material/ManageAccounts";
import SignInIcon from "@mui/icons-material/Login";
import SignOutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SignUpIcon from "@mui/icons-material/PersonAdd";

const borderBottom = {
  content: "''",
  position: "absolute",
  display: "block",
  bottom: "-30%",
  left: "50%",
  transform: "translate(-50%)",
  height: "2px",
  width: "50%",
  backgroundColor: "secondary.main",
};

export const drawerWidth = 240,
  mainNavList = ["home", "products", "about", "contact"],
  navProductsList = ["shoes", "belts", "purses"];

export const linkWrapperStyles = (active: string) => {
  const index = mainNavList.indexOf(active) + 1;

  return {
    display: { xs: "none", md: "flex" },
    flexGrow: 1,
    justifyContent: "center",
    gap: "2rem",

    "& .nav-item": {
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "500",
      color: "primary.main",
      position: "relative",
      textTransform: "capitalize",
      cursor: "pointer",

      [`&:nth-of-type(${index}):after`]: borderBottom,

      "&:hover": {
        color: "primary.light",

        "&:after": borderBottom,
      },
    },
  };
};

export const productsNavStyle = {
  color: "inherit",
  textDecoration: "none",
  display: "block",
};

//signedInMenu = ["profile", "account", "sign out"],
// notSignedInMenu = ["sign in", "sign up"];

export const signedInMenu = [
  {
    name: "profile",
    href: "/cart",
    Icon: PersonIcon,
  },
  {
    name: "account",
    href: "/cart",
    Icon: AccountIcon,
  },
  {
    name: "sign out",
    href: "/cart",
    Icon: SignOutIcon,
  },
];

export const notSignedInMenu = [
  {
    name: "sign in",
    href: "/signin",
    Icon: SignInIcon,
  },
  {
    name: "sign up",
    href: "/signup",
    Icon: SignUpIcon,
  },
];
