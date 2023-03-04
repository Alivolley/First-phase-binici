import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ArrowCircleLeftOutlined from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlined from '@mui/icons-material/ArrowCircleRightOutlined';
import CloseFullscreen from '@mui/icons-material/CloseFullscreen';
import OpenInFull from '@mui/icons-material/OpenInFull';
import Search from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import React from 'react';

import classes from './treeDataBarWrapper.module.scss';

const TreeDataBarWrapper = props => {
  return (
    <div className={classes.barWrapper}>
      <div className={classes.categorieCollexpandBox}>
        <Tooltip placement="top" title="اضافه کردن">
          <div className={classes.TreeDataMaterialCompressBtn}>
            <IconButton onClick={props.showCreateModal} color="success">
              <AddCircleOutline />
            </IconButton>
          </div>
        </Tooltip>

        <div className={classes.categorieCollexpandBoxRight}>
          <Tooltip placement="top" title="باز کردن همه">
            <div className={classes.TreeDataMaterialCompressBtn}>
              <IconButton onClick={() => props.expansionTrue(true)}>
                <OpenInFull />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip placement="top" title="بستن همه">
            <div className={classes.TreeDataMaterialCompressBtn}>
              <IconButton onClick={() => props.expansionFalse(false)}>
                <CloseFullscreen />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>

      <div className={classes.treeDataSearchAndChildKeeper}>
        <div className={classes.treeDataSearchBoxChild}>
          <IconButton onClick={props.goPrev}>
            <ArrowCircleLeftOutlined />
          </IconButton>

          <label className={classes.treeDataSearchCount}>
            {props.searchIndex} / {props.searchCount}
          </label>

          <IconButton onClick={props.goNext}>
            <ArrowCircleRightOutlined />
          </IconButton>
        </div>

        <TextField
          onChange={props.searchInputChange}
          className={classes.treeDataSearchInput}
          id="input-with-icon-textfield"
          label=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default TreeDataBarWrapper;
