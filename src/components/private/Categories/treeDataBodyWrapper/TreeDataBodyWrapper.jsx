/* eslint-disable react/jsx-key */
import AddOutlined from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { DndContext } from 'react-dnd';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';

import classes from './treeDataBodyWrapper.module.scss';

const TreeDataBodyWrapper = props => {
  return (
    <div className={classes.treeDataWrapper} style={{ height: 500 }}>
      <DndContext.Consumer>
        {({ dragDropManager }) => (
          <SortableTree
            dragDropManager={dragDropManager}
            className={classes.scrolableTreeBody}
            treeData={props.treeData}
            rowDirection="rtl"
            isVirtualized={false}
            canDrag={false}
            canDrop={false}
            onChange={props.changeHandler}
            onMoveNode={({ node, treeIndex, path }) =>
              global.console.debug(
                'node:',
                node,
                'treeIndex:',
                treeIndex,
                'path:',
                path,
              )
            }
            maxDepth={5}
            searchQuery={props.searchString}
            searchFocusOffset={props.searchFocusIndex}
            searchFinishCallback={matches => props.searchFinish(matches)}
            generateNodeProps={rowInfo => ({
              buttons: [
                <Tooltip placement="right" title="ویرایش">
                  <div>
                    <IconButton
                      color="primary"
                      onClick={() => props.editHandler(rowInfo)}
                    >
                      <EditOutlined />
                    </IconButton>
                  </div>
                </Tooltip>,
                <Tooltip placement="right" title="افزودن">
                  <div>
                    <IconButton
                      color="success"
                      onClick={() => props.createHandler(rowInfo)}
                    >
                      <AddOutlined />
                    </IconButton>
                  </div>
                </Tooltip>,
                <Tooltip placement="right" title="حذف">
                  <div>
                    <IconButton
                      color="error"
                      onClick={() => props.deleteHandler(rowInfo)}
                    >
                      <DeleteOutlineOutlined />
                    </IconButton>
                  </div>
                </Tooltip>,
              ],
            })}
          />
        )}
      </DndContext.Consumer>
    </div>
  );
};

export default TreeDataBodyWrapper;
