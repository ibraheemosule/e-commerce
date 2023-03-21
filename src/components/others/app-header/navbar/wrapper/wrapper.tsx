import { useState, FC, MouseEvent, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../../../../store/hooks";

const navWrapper = (Nav: React.ComponentType<NavbarProps>) => {
  const Navbar: FC<{
    offScreen: boolean;
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
  }> = (props) => {
    const { signin } = useAppSelector(({ user }) => user);
    const [active, setActive] = useState(1);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    function openUserMenu(event: MouseEvent<HTMLElement>, index?: number) {
      setAnchorElUser(event.currentTarget);
      if (!index) return;
      setActive(() => index + 1);
    }

    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
      <>
        <Nav
          offScreen={props.offScreen}
          handleCloseUserMenu={handleCloseUserMenu}
          active={active}
          setActive={setActive}
          openUserMenu={openUserMenu}
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
  active: number;
  anchorElUser: null | HTMLElement;
  openUserMenu: (e: MouseEvent<HTMLElement>, i?: number) => void;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<number>>;
  signin: boolean;
}

export default navWrapper;
