import { Stack, styled } from '@mui/material';
import { NavCircularButton } from 'components/shared/NavCircularButton/NavCircularButton';
import { useAtom } from 'jotai';
import { selectedCategoryDataAtom } from 'store/private/layout/layoutAtoms';

import { categoriesLinks } from '../navLinks';

export const CategoryLinks = props => {
  const { direction } = props;

  const [selectedCategoryData, setSelectedCategoryData] = useAtom(
    selectedCategoryDataAtom,
  );

  return (
    <Container
      w="100%"
      direction={direction}
      justifyContent={direction === 'column' ? 'center' : 'space-between'}
      spacing={direction === 'column' ? 2 : 0}
    >
      {categoriesLinks.map(category => (
        <NavCircularButton
          key={category.id}
          variant="light"
          size="small"
          icon={category.icon}
          isSelected={category.id === selectedCategoryData.id}
          onClick={() => setSelectedCategoryData(category)}
        />
      ))}
    </Container>
  );
};

const Container = styled(Stack)`
  ${({ direction }) => ({
    flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
    gap: direction === 'row' ? '16px' : 0,
  })}
`;
