import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../alert/alert-styles.scss';

class Alert extends PureComponent {
  static propTypes = {
    /**
     * The Alert visual variant
     *
     * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'}
     */
    variant: PropTypes.string,

    /**
     * Renders a properly aligned dismiss button, as well as
     * adding extra horizontal padding to the Alert.
     */
    dismissible: PropTypes.bool,

    /**
     * Controls the visual state of the Alert.
     */
    show: PropTypes.bool,
  };

  static defaultProps = {
    variant: 'primary',
    show: true,
  };

  handleClose = function() {

  };

  render() {
    const { variant, dismissible, className, children } = this.props;

    return (
      <div
        role="alert"
        className={classNames(
          className,
          'alert',
          variant && `alert-${variant}`,
          dismissible && 'alert-dismissible',
        )}
      >
        {dismissible && <div onClick={this.handleClose} label="Close" />}
        <style jsx>{styles}</style>
        {children}
      </div>
    );
  }
}

export default Alert;
