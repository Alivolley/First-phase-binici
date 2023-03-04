import { SortableContainer } from 'react-sortable-hoc';
import { css } from '@emotion/react';
import SortableItem from './SortableItem';
import SortableItemInterface from './SortableItemInterface';
/** @jsxImportSource @emotion/react */

const SortableList = SortableContainer(({ items, onDelete }: {
  items: SortableItemInterface[],
  onDelete: Function
}) => (
  // @ts-ignore
  <ul css={css`padding-right: 0;`}>
    {items.map((item, index) => (
      <SortableItem key={`item-${item.guid}`} onDelete={() => onDelete(item)} index={index} value={item.title} />
    ))}
  </ul>
));

export default SortableList;
