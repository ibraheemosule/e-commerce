import { useState, FC, MouseEvent, Dispatch, SetStateAction } from "react";

const navWrapper = (Nav: React.ComponentType<NavbarProps>) => {
  const Navbar: FC<{
    offScreen: boolean;
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
  }> = (props) => {
    const [showMenu, setShowMenu] = useState(false),
      [active, setActive] = useState(1);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const openUserMenu = (event: MouseEvent<HTMLElement>, i?: number) => {
      setAnchorElUser(event.currentTarget);

      if (!i) return;
      setActive(() => i + 1);
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
        />
      </>
    );
  };

  return Navbar;
};

export default navWrapper;

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
}
// export default memo(Navbar);
