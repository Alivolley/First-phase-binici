/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import 'react-sortable-tree/style.css';
import './ProductCategories.scss';

import useGetProductsTreeData from 'api/productCategories/useGetProductsTreeData';
import CreateProductBaseNodeModal from 'components/private/Categories/ProductCategories/baseNodes/CreateProductBaseNodeModal';
import DeleteProductBaseNodeDialog from 'components/private/Categories/ProductCategories/baseNodes/DeleteProductBaseNodeDialog';
import EditProductBaseNodeModal from 'components/private/Categories/ProductCategories/baseNodes/EditProductBaseNodeModal';
import CreateProductSubNodeModal from 'components/private/Categories/ProductCategories/subNodes/CreateProductSubNodeModal';
import DeleteProductSubNodeDialog from 'components/private/Categories/ProductCategories/subNodes/DeleteProductSubNodeDialog';
import EditProductSubNodeModal from 'components/private/Categories/ProductCategories/subNodes/EditProductSubNodeModal';
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

function ProductCategories() {
  const { guid: categoryGuid } = useParams();

  const [getLoading, treeData, setTreeData, getTreeData] =
    useGetProductsTreeData();

  const [searchString, setSearchString] = useState('');
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);

  const [createBaseNodeModal, setCreateBaseNodeModal] = useState({
    show: false,
    guid: null,
    rowInfo: null,
  });
  const [createSubNodeModal, setCreateSubNodeModal] = useState({
    show: false,
    guid: null,
    type: '',
    rowInfo: null,
  });
  const [deleteBaseNodeDialog, setDeleteBaseNodeDialog] = useState({
    show: false,
    guid: null,
    rowInfo: null,
  });
  const [deleteSubNodeDialog, setDeleteSubNodeDialog] = useState({
    show: false,
    guid: null,
    rowInfo: null,
  });
  const [editBaseNodeModal, setEditBaseNodeModal] = useState({
    show: false,
    guid: null,
    type: '',
    rowInfo: null,
  });
  const [editSubNodeModal, setEditSubNodeModal] = useState({
    show: false,
    guid: null,
    type: '',
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
                setCreateBaseNodeModal({
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
              editHandler={rowInfo => {
                if (rowInfo.node.type === '0') {
                  setEditBaseNodeModal({
                    show: true,
                    guid: rowInfo.node.guid,
                    rowInfo: rowInfo,
                  });
                } else {
                  setEditSubNodeModal({
                    show: true,
                    guid: rowInfo.node.guid,
                    type: rowInfo.node.type,
                    rowInfo: rowInfo,
                  });
                }
              }}
              createHandler={rowInfo => {
                if (rowInfo.node.type === '0') {
                  setCreateBaseNodeModal({
                    show: true,
                    guid: rowInfo.node.guid,
                    rowInfo: rowInfo,
                  });
                } else {
                  setCreateSubNodeModal({
                    show: true,
                    guid: rowInfo.node.guid,
                    type: rowInfo.node.childType,
                    rowInfo: rowInfo,
                  });
                }
              }}
              deleteHandler={rowInfo => {
                if (rowInfo.node.type === '0') {
                  setDeleteBaseNodeDialog({
                    show: true,
                    guid: rowInfo.node.guid,
                    rowInfo: rowInfo,
                  });
                } else {
                  setDeleteSubNodeDialog({
                    show: true,
                    guid: rowInfo.node.guid,
                    rowInfo: rowInfo,
                  });
                }
              }}
            />
          </div>
        </div>
      ) : null}

      {createBaseNodeModal.show ? (
        <CreateProductBaseNodeModal
          show={createBaseNodeModal.show}
          closeHandler={() =>
            setCreateBaseNodeModal({ show: false, guid: null })
          }
          guid={createBaseNodeModal.guid}
          refreshData={data => {
            setCreateBaseNodeModal({
              show: false,
              guid: null,
              type: '',
            });
            refreshDataAfterCreateNode(data, createBaseNodeModal);
          }}
        />
      ) : null}
      {createSubNodeModal.show ? (
        <CreateProductSubNodeModal
          show={createSubNodeModal.show}
          closeHandler={() =>
            setCreateSubNodeModal({ show: false, guid: null, type: '' })
          }
          guid={createSubNodeModal.guid}
          isParent
          type={createSubNodeModal.type}
          refreshData={data => {
            setCreateSubNodeModal({
              show: false,
              guid: null,
              type: '',
            });
            refreshDataAfterCreateNode(data, createSubNodeModal);
          }}
        />
      ) : null}

      {editBaseNodeModal.show ? (
        <EditProductBaseNodeModal
          show={editBaseNodeModal.show}
          closeHandler={() =>
            setEditBaseNodeModal({ show: false, guid: null, type: '' })
          }
          guid={editBaseNodeModal.guid}
          refreshData={data => {
            setEditBaseNodeModal({
              show: false,
              guid: null,
            });
            refreshDataAfterEditNode(data, editBaseNodeModal);
          }}
        />
      ) : null}
      {editSubNodeModal.show ? (
        <EditProductSubNodeModal
          show={editSubNodeModal.show}
          closeHandler={() =>
            setEditSubNodeModal({ show: false, guid: null, type: '' })
          }
          guid={editSubNodeModal.guid}
          isParent={false}
          type={editSubNodeModal.type}
          refreshData={data => {
            setEditSubNodeModal({
              show: false,
              guid: null,
            });
            refreshDataAfterEditNode(data, editSubNodeModal);
          }}
        />
      ) : null}

      <DeleteProductBaseNodeDialog
        show={deleteBaseNodeDialog.show}
        closeHandler={() =>
          setDeleteBaseNodeDialog({ show: false, guid: null })
        }
        guid={deleteBaseNodeDialog.guid}
        refreshData={() => {
          setDeleteBaseNodeDialog({
            show: false,
            guid: '',
            rowInfo: null,
          });
          refreshDataAfterDeleteNode(deleteBaseNodeDialog);
        }}
      />
      <DeleteProductSubNodeDialog
        show={deleteSubNodeDialog.show}
        closeHandler={() => setDeleteSubNodeDialog({ show: false, guid: null })}
        guid={deleteSubNodeDialog.guid}
        refreshData={() => {
          setDeleteSubNodeDialog({
            show: false,
            guid: '',
            rowInfo: null,
          });
          refreshDataAfterDeleteNode(deleteSubNodeDialog);
        }}
      />
    </>
  );
}

export default ProductCategories;
