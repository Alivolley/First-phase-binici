import { useAtom } from 'jotai';
import {
  selectedCategoryDataAtom,
  selectedMobileBurgerTabDataAtom,
} from 'store/private/layout/layoutAtoms';

import { SearchMenuContent } from './SearchMenuContent/SearchMenuContent';
import { StoreMenuLinks } from './StoreMenuLinks/StoreMenuLinks';

export const MenuTabContentSwitcher = props => {
  const [selectedCategoryData] = useAtom(selectedCategoryDataAtom);
  const [selectedMobileBurgerTabData] = useAtom(
    selectedMobileBurgerTabDataAtom,
  );

  if (
    selectedMobileBurgerTabData.name === 'store' ||
    selectedCategoryData.name === 'store'
  ) {
    return <StoreMenuLinks />;
  } else if (
    selectedMobileBurgerTabData.name === 'search' ||
    selectedCategoryData.name === 'search'
  ) {
    return <SearchMenuContent />;
  } else {
    return null;
  }
};
