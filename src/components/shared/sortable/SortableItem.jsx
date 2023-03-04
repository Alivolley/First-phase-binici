import { SortableElement } from 'react-sortable-hoc';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonBase } from '@mui/material';
import MoveSvg from '../icons/MoveSvg';
import TrashSvg from '../icons/TrashSvg';

const SortableItem = SortableElement(({ value, onDelete }) => {
  const onDeleteWrapper = () => {
    setTimeout(() => {
      const ok = window.confirm('آیا از حذف اطمینان دارید؟');
      if (ok) {
        onDelete();
      }
    }, 50)
  };

  return (
    <li css={css`
      padding: 6px 10px;
      //border: 1px solid #737373;
      background: #F5F5F5;
      border-radius: 5px;
      list-style: none;
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin-bottom: 5px;
    `}
    >
      <div css={css`
        display: flex;
        align-items: center;
        gap: 1rem;
`}
      >
        <MoveSvg />
        <span>{value}</span>
      </div>
      <div css={css`display: flex; align-items: center`}>
        <ButtonBase onMouseDown={onDeleteWrapper}>
          <TrashSvg />
        </ButtonBase>
      </div>
    </li>
  );
});

export default SortableItem;
