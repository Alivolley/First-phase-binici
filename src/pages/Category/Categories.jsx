/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import 'react-sortable-tree/style.css';
import './Categories.scss';

import useGetProductsTreeData from 'api/categories/useGetProductsTreeData';
import CreateCategoryModal from 'components/private/Categories/createCategoryModal/CreateCategoryModal';
import DeleteCategoryDialog from 'components/private/Categories/deleteCategoryDialog/DeleteCategoryDialog';
import TreeDataBarWrapper from 'components/private/Categories/treeDataBarWrapper/TreeDataBarWrapper';
import TreeDataBodyWrapper from 'components/private/Categories/treeDataBodyWrapper/TreeDataBodyWrapper';
import PageSpinner from 'components/shared/pageSpinner/PageSpinner';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toggleExpandedForAll } from 'react-sortable-tree';

function Category() {
  const { guid: categoryGuid } = useParams();

  const [getLoading, treeData, setTreeData, getTreeData] =
    useGetProductsTreeData();

  const [searchString, setSearchString] = useState('');
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState({
    show: false,
    guid: null,
  });
  const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState({
    show: false,
    guid: null,
  });
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    guid: null,
  });

  useEffect(() => {
    getTreeData(categoryGuid);
  }, []);

  const refreshDataAfterCreateCategory = () => {
    setShowCreateCategoryModal({
      show: false,
      guid: null,
    });
    getTreeData(categoryGuid);
  };

  const refreshDataAfterCreateDelete = () => {
    setShowDeleteCategoryDialog({
      show: false,
      guid: null,
    });
    getTreeData(categoryGuid);
  };

  const refreshDataAfterEdit = () => {
    setShowEditModal({
      show: false,
      guid: null,
    });
    getTreeData(categoryGuid);
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
                setShowCreateCategoryModal({
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
                setShowEditModal({
                  show: true,
                  guid: rowInfo.node.categoryGuid,
                });
              }}
              createHandler={rowInfo =>
                setShowCreateCategoryModal({
                  show: true,
                  guid: rowInfo.node.categoryGuid,
                })
              }
              deleteHandler={rowInfo => {
                setShowDeleteCategoryDialog({
                  show: true,
                  guid: rowInfo.node.categoryGuid,
                });
              }}
            />
          </div>
        </div>
      ) : null}

      <CreateCategoryModal
        show={showCreateCategoryModal.show}
        closeHandler={() =>
          setShowCreateCategoryModal({ show: false, guid: null })
        }
        selectedCategoryGuid={showCreateCategoryModal.guid}
        refreshData={refreshDataAfterCreateCategory}
      />

      <DeleteCategoryDialog
        show={showDeleteCategoryDialog.show}
        closeHandler={() =>
          setShowDeleteCategoryDialog({ show: false, guid: null })
        }
        selectedCategoryGuid={showDeleteCategoryDialog.guid}
        refreshData={refreshDataAfterCreateDelete}
      />
    </>
  );
}

export default Category;
