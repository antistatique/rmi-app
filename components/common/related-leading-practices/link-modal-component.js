import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'components/common/custom-modal';

import styles from './link-modal-styles.scss';

class LinkModal extends PureComponent {
  static propTypes = {
    leadingPractice: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

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

  buildLinks = () => {
    const companies = this.props.leadingPractice.companies.map((company) => {
      return {
        name: company.name,
        id: company.id,
        language: this.props.currentLanguage
      };
    });

    return companies;
  }

  render() {
    const { leadingPractice } = this.props;
    const links = this.buildLinks();

    return (
      <div>
        <style jsx>{styles}</style>
        <li>
          <a role="button" onClick={this.handleClick} style={{ cursor: 'pointer' }}>{leadingPractice.name}</a>
        </li>
        <Modal open={this.state.open} title={leadingPractice.name} onClose={this.handleClose} links={links}>
          <p>{leadingPractice.description}</p>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({ currentLanguage: state.language.current }),
  {}
)(LinkModal);
