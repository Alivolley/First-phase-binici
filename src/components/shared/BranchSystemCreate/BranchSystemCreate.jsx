import styled from '@emotion/styled';
import { Button, Paper } from '@mui/material';
import useGetSystemBranchInsert from 'api/branch/useGetSystemBranchData/useGetSystemBranchInsertData';
import React, { useCallback, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';

import useInsertSystemBranch from '../../../api/branch/useInsertSystemBranch/useInsertSystemBranch';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import TryAgain from '../TryAgain/TryAgain';
import Card from './Card';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
  top: 'auto',
  left: 'auto',
});

const BranchSystemCreate = ({ branchGuid, onEditComplete }) => {
  const {
    getBranchInsert: getData,
    getBranchInsertData: data,
    setGetBranchInsertData: setData,
    getBranchInsertError: getError,
    getBranchInsertLoading: getLoading,
  } = useGetSystemBranchInsert();

  const {
    insertSystemBranch: insert,
    insertSystemBranchLoading: insertLoading,
  } = useInsertSystemBranch();

  const { guid } = useParams();

  useEffect(() => {
    getData(branchGuid);
  }, []);

  const navigate = useNavigate();

  function handleSubmit() {
    const submitData = {
      values: data.value.map(i => ({
        guid: i.guid,
        selectedValue: i.selectedValue,
        showInDisplay: !!i.showInDisplay,
      })),
    };
    if (!!guid && !branchGuid) {
      submitData.originGuid = guid;
      insert(false, submitData, () => {
        navigate(`/productDetail/${guid}`);
      });
    } else {
      submitData.guid = branchGuid;
      insert(true, submitData, () => onEditComplete());
    }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = result => {
    try {
      const { source, destination } = result;

      const reordered = reorder(data.value, source.index, destination.index);
      setData(prev => ({ ...prev, value: reordered }));
    } catch (e) {
      console.log(e);
    }
  };

  if (getLoading) {
    return <SpinnerLoader />;
  }

  if (getError) {
    return <TryAgain tryAgain={() => getData(branchGuid)} />;
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="0">
          {(provided, snapshot) => (
            <DroppableContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data?.value?.map((card, index) => (
                <Draggable
                  key={card.guid}
                  draggableId={`${card.guid}`}
                  index={index}
                >
                  {(provided1, s) => (
                    <div
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      style={getItemStyle(
                        s.isDragging,
                        provided1?.draggableProps?.style,
                      )}
                    >
                      <Card setData={setData} key={card.guid} card={card} />
                    </div>
                  )}
                </Draggable>
              ))}
            </DroppableContainer>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ m: 'auto', display: 'block', mb: '20px', maxWidth: '120px' }}
        fullWidth
        disabled={getLoading || insertLoading}
        size={'large'}
      >
        ثبت
      </Button>
    </div>
  );
};

const DroppableContainer = styled.div`
  padding-bottom: 50px;
`;

export default BranchSystemCreate;
