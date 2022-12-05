import { StoreIcon } from 'components/svgIcons/StoreIcon';
import { atom } from 'jotai';

export const selectedCategoryDataAtom = atom({
  id: '1',
  name: 'store',
  icon: <StoreIcon />,
  label: 'فروشگاه',
});

export const selectedMobileBurgerTabDataAtom = atom({
  ...selectedCategoryDataAtom,
});

export const selectedRouteTitleAtom = atom('داشبورد');

export const isSidebarOpenAtom = atom(true);
export const isBottomBarOpenAtom = atom(false);

export const isMobileBurgerMenuOpenAtom = atom(false);
