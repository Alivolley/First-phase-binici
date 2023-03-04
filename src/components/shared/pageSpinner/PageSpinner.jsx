/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import classes from './pageSpinner.module.scss';

const PageSpinner = props => {
  return (
    <>
      {props.loading ? (
        <div className={classes.pageSpinner}>
          <div className={classes.spinner}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <strong className={classes.pageSpinnerTitle}>در حال بارگیری</strong>
        </div>
      ) : null}
    </>
  );
};

export default PageSpinner;
