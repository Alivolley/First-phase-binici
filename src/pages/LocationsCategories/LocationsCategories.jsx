/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import 'react-sortable-tree/style.css';
import './LocationsCategories.scss';

import useGetLocationsTreeData from 'api/locationsCategories/useGetLocationsTreeData';
import CreateSectionNodeModal from 'components/private/Categories/LocationsCategories/section/CreateSectionNodeModal';
import TreeDataBarWrapper from 'components/private/Categories/treeDataBarWrapper/TreeDataBarWrapper';
import TreeDataBodyWrapper from 'components/private/Categories/treeDataBodyWrapper/TreeDataBodyWrapper';
import PageSpinner from 'components/shared/pageSpinner/PageSpinner';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath,
  toggleExpandedForAll,
} from 'react-sortable-tree';

function LocationsCategories() {
  const { guid: categoryGuid } = useParams();

  const [getLoading, treeData, setTreeData, getTreeData] =
    useGetLocationsTreeData();

  const [searchString, setSearchString] = useState('');
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);

  const [createBaseNodeModal, setCreateSectionNodeModal] = useState({
    show: false,
    guid: null,
    rowInfo: null,
  });

  useEffect(() => {
    getTreeData(categoryGuid);
  }, []);

  const refreshDataAfterCreateNode = (data, rowData) => {
    const newTree = addNodeUnderParent({
      treeData: treeData,
      newNode: data,
      expandParent: true,
      parentKey: rowData.rowInfo ? rowData.rowInfo.treeIndex : undefined,
      getNodeKey: ({ treeIndex }) => treeIndex,
    });
    setTreeData(newTree.treeData);
  };

  const refreshDataAfterDeleteNode = rowData => {
    const { path } = rowData.rowInfo;
    const newTree = removeNodeAtPath({
      treeData: treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
    });
    setTreeData(newTree);
  };

  const refreshDataAfterEditNode = (data, rowData) => {
    const { path } = rowData.rowInfo;
    const newTree = changeNodeAtPath({
      treeData: treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: data,
    });
    setTreeData(newTree);
  };

  const toggleNodeExpansion = expanded => {
    const newData = toggleExpandedForAll({
      treeData: treeData,
      expanded,
    });
    setTreeData(newData);
  };

  return (
    <>
      <PageSpinner loading={getLoading} />

      {!getLoading ? (
        <div className="tree-data-wrapper">
          <div className="tree-data-wrapper-insidebox">
            <TreeDataBarWrapper
              showCreateModal={() =>
                setCreateSectionNodeModal({
                  show: true,
                  guid: categoryGuid,
                })
              }
              expansionTrue={status => toggleNodeExpansion(status)}
              expansionFalse={status => toggleNodeExpansion(status)}
              goPrev={() =>
                setSearchFocusIndex(prevState =>
                  searchFocusIndex !== null
                    ? (searchFoundCount + searchFocusIndex - 1) %
                      searchFoundCount
                    : searchFoundCount - 1,
                )
              }
              searchIndex={searchFocusIndex}
              searchCount={searchFoundCount}
              goNext={() =>
                setSearchFocusIndex(prevState =>
                  searchFocusIndex !== null
                    ? (searchFocusIndex + 1) % searchFoundCount
                    : 0,
                )
              }
              searchInputChange={e => setSearchString(e.target.value)}
            />

            <TreeDataBodyWrapper
              treeData={treeData}
              changeHandler={newData => setTreeData(newData)}
              searchString={searchString}
              searchFocusIndex={searchFocusIndex}
              onlyExpandSearchedNodes
              searchFinish={matches => {
                setSearchFoundCount(matches.length);
                const index =
                  matches.length > 0 ? searchFocusIndex % matches.length : 0;
                setSearchFocusIndex(index);
              }}
              editHandler={rowInfo => {}}
              createHandler={rowInfo => {}}
              deleteHandler={rowInfo => {}}
            />
          </div>
        </div>
      ) : null}

      {createBaseNodeModal.show ? (
        <CreateSectionNodeModal
          show={createBaseNodeModal.show}
          closeHandler={() =>
            setCreateSectionNodeModal({ show: false, guid: null })
          }
          guid={createBaseNodeModal.guid}
          refreshData={data => {
            setCreateSectionNodeModal({
              show: false,
              guid: null,
              type: '',
            });
            refreshDataAfterCreateNode(data, createBaseNodeModal);
          }}
        />
      ) : null}
    </>
  );
}

export default LocationsCategories;
