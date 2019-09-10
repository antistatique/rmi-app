import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './custom-modal-styles.scss';

class Modal extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  close = () => {
    this.setState({ open: false });
    this.props.onClose();
  }

  render() {
    const { title } = this.props;

    return (
      <div className={`c-custom-modal-wrapper ${this.state.open ? 'open' : ''}`}>
        <style jsx>{styles}</style>
        <div className="c-custom-modal-overlay"></div>
        <div className="c-custom-modal">
          <button className="c-custom-modal-close" onClick={this.close}>Close</button>
          <div className="c-custom-modal-content">
            <div className="header">
              <h2>{title}</h2>
            </div>
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
