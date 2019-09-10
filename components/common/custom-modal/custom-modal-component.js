import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import styles from './custom-modal-styles.scss';

class Modal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
    resetModal: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetModal();
  }

  render() {
    const {
      visible,
      content,
      title,
      links
    } = this.props;

    return (
      <div className={`c-custom-modal ${visible ? 'visible' : ''}`}>
        <style jsx>{styles}</style>
        <button onClick={this.props.toggleModal()}>Close</button>
        <div className="header">
          <h2>{title}</h2>
          <div className="links">
            {links.map(link => (
              <Link
                route={link.route}
                params={link.params}
              >
                <a className="link">
                  {link.text}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="content">
          {content}
        </div>
      </div>
    );
  }
}

export default Modal;
