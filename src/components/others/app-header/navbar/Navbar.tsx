import { FC, memo, useState, useEffect } from "react";
import MobileNav from "./mobile-nav/MobileNav";
import DesktopNav from "./desktop-nav/DesktopNav";
import { useRouter } from "next/router";

const Navbar: FC<NavProps> = ({ offScreen }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => setShowMenu(false), [router.asPath]);

  return (
    <>
      <DesktopNav
        offScreen={offScreen}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <MobileNav
        offScreen={offScreen}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  );
};

interface NavProps {
  offScreen: boolean;
}

export default memo(Navbar);
