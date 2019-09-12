import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/common/custom-modal';

class DownloadsLink extends PureComponent {
  static propTypes = {
    files: PropTypes.array.isRequired,
    headline: PropTypes.string.isRequired
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

  render() {
    return (
      <div>
        <a role="button" onClick={this.handleClick} style={{ cursor: 'pointer' }}>{this.props.headline}</a>
        <Modal open={this.state.open} title={this.props.headline} onClose={this.handleClose}>
          <ul>
            {this.props.files.map(file => (
              <li className="mb-2">
                <a href={file['download-link']}>{file.name}</a>
              </li>
            ))}
          </ul>
        </Modal>
      </div>
    );
  }
}

export default DownloadsLink;
