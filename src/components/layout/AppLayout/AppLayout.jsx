import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';
import { isMobileBurgerMenuOpenAtom } from 'store/private/layout/layoutAtoms';

import { BottomBar } from '../BottomBar/BottomBar';
import { MobileBurgerMenu } from '../MobileBurgerMenu/MobileBurgerMenu';
import { PageTemplate } from '../PageTemplate/PageTemplate';
import { Sidebar } from '../Sidebar/Sidebar';

export const AppLayout = () => {
  const [isMobileBurgerMenuOpen, setIsMobileBurgerMenuOpen] = useAtom(
    isMobileBurgerMenuOpenAtom,
  );

  return (
    <>
      <Sidebar />
      <BottomBar />

      <AnimatePresence>
        {isMobileBurgerMenuOpen ? <MobileBurgerMenu /> : null}
      </AnimatePresence>

      <PageTemplate>
        <Outlet />
      </PageTemplate>
    </>
  );
};
