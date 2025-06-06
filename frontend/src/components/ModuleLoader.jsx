import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import styles from './ModuleLoader.module.scss';

/**
 * ModuleLoader component for displaying a loading state for entire module pages.
 * 
 * @param {Object} props Component props
 * @param {string} [props.title="Loading..."] - The loading title to display
 * @param {string} [props.message="Please wait while we load the data..."] - The loading message
 * @param {string} [props.spinnerSize="large"] - Size of the spinner (small, medium, large)
 * @returns {React.ReactElement} The ModuleLoader component
 */
const ModuleLoader = ({ 
  title = "Loading...", 
  message = "Please wait while we load the data...",
  spinnerSize = "large" 
}) => {
  return (
    <div className={styles.moduleLoader}>
      <div className={styles.content}>
        <Spinner size={spinnerSize} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

ModuleLoader.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  spinnerSize: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default ModuleLoader; 