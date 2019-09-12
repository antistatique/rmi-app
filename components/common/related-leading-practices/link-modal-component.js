import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/common/custom-modal';

import styles from './link-modal-styles.scss';

class LinkModal extends PureComponent {
  static propTypes = { leadingPractice: PropTypes.object.isRequired }

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  handleClick = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { leadingPractice } = this.props;

    return (
      <div>
        <style jsx>{styles}</style>
        <li key={leadingPractice.id}>
          <a role="button" onClick={this.handleClick} style={{ cursor: 'pointer' }}>{leadingPractice.name}</a>
        </li>
        <Modal open={this.state.open} title={leadingPractice.name} onClose={this.handleClose}>
          {leadingPractice.description}
        </Modal>
      </div>
    );
  }
}

export default LinkModal;
