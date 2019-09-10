import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import styles from './custom-modal-styles.scss';
import Icon from '../icon';

class Modal extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    links: PropTypes.array
  }

  static defaultProps = { links: [] }

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
    const { title, links } = this.props;

    return (
      <div className={`c-custom-modal-wrapper ${this.state.open ? 'open' : ''}`}>
        <style jsx>{styles}</style>
        <div className="c-custom-modal-overlay"></div>
        <div className="c-custom-modal">
          <button className="c-custom-modal-close" onClick={this.close}>
            <Icon name="cross" className="-small" />
          </button>
          <div className="c-custom-modal-content">
            <div className="header">
              <h2>{title}</h2>
              {links.length > 0 && links.map(link => (
                <h5 className="company">
                  <Link route="companies" params={{ language: link.language, company: link.id }}>
                    <a>{link.name}</a>
                  </Link>
                </h5>
              ))}
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
