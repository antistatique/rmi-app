import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/common/custom-modal';
import Icon from 'components/common/icon';

class DownloadsLink extends PureComponent {
  static propTypes = {
    files: PropTypes.array,
    headline: PropTypes.string.isRequired
  }

  static defaultProps = { files: [] }

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
        <a role="button" onClick={this.handleClick} style={{ cursor: 'pointer' }}>
          <Icon name="download-file" />
        </a>
        <Modal open={this.state.open} title={this.props.headline} onClose={this.handleClose}>
          <ul>
            {this.props.files.map(file => (
              <li className="mb-4">
                <a href={file['download-link']} style={{ textDecoration: 'underline' }}>
                  <Icon className="mr-2" name="download-file" />
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </Modal>
      </div>
    );
  }
}

export default DownloadsLink;
