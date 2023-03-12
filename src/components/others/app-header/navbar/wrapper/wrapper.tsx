import { useState, FC, MouseEvent, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../../../../store/hooks";

const navWrapper = (Nav: React.ComponentType<NavbarProps>) => {
  const Navbar: FC<{
    offScreen: boolean;
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
  }> = (props) => {
    const { signin } = useAppSelector((state) => state.user);

    const [showMenu, setShowMenu] = useState(false),
      [active, setActive] = useState(1);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const openUserMenu = (event: MouseEvent<HTMLElement>, index?: number) => {
      setAnchorElUser(event.currentTarget);
      console.log(signin);
      if (!index) return;
      setActive(() => index + 1);
    };

    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleDrawerToggle = () => {
      setShowMenu(!showMenu);
    };

    return (
      <>
        <Nav
          offScreen={props.offScreen}
          handleCloseUserMenu={handleCloseUserMenu}
          active={active}
          setActive={setActive}
          openUserMenu={openUserMenu}
          handleDrawerToggle={handleDrawerToggle}
          anchorElUser={anchorElUser}
          showMenu={props.showMenu}
          setShowMenu={props.setShowMenu}
          signin={signin}
        />
      </>
    );
  };

  return Navbar;
};

export interface NavbarProps {
  offScreen: boolean;
  handleCloseUserMenu: () => void;
  handleDrawerToggle: () => void;
  active: number;
  anchorElUser: null | HTMLElement;
  openUserMenu: (e: MouseEvent<HTMLElement>, i?: number) => void;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<number>>;
  signin: boolean;
}

export default navWrapper;
