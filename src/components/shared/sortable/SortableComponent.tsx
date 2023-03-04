import SortableList from './SortableList';
import SortableItemInterface from './SortableItemInterface';

export default function SortableComponent({ items, onSortEnd, onDelete } : {
  items: SortableItemInterface[],
  onSortEnd: ({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => void,
  onDelete: Function
}) {
  return (
    // @ts-ignore
    <SortableList items={items} onDelete={onDelete} onSortEnd={onSortEnd} />
  );
}
