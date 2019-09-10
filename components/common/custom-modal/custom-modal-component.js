import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './custom-modal-styles.scss';

class Modal extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { title } = this.props;

    return (
      <div className={`c-custom-modal ${this.state.open ? 'open' : ''}`}>
        <style jsx>{styles}</style>
        <button onClick={this.close}>Close</button>
        <div className="header">
          <h2>{title}</h2>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
