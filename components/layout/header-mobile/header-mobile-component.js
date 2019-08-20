import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Button from 'components/common/button';
import Icon from 'components/common/icon';

// styles
import styles from './header-mobile-styles.scss';

class HeaderMobile extends PureComponent {
  static propTypes = {
    root: PropTypes.string.isRequired,
    sidebarVisibility: PropTypes.bool.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    toggleSidebar: PropTypes.func.isRequired
  }

  handleToggleSidebar = () => {
    const { toggleSidebar, sidebarVisibility } = this.props;

    toggleSidebar(!sidebarVisibility);
  }

  render() {
    const { root, currentLanguage } = this.props;

    return (
      <header className="c-header-mobile">
        <style jsx>{styles}</style>
        <div className="l-layout">
          <div className="header-mobile-container">
            <Link
              route={root}
              params={{ language: currentLanguage }}
            >
              <a className="app-logo"><img src={`/static/logos/RMI_Index_Color.svg`} alt="RMI logo" /></a>
            </Link>
            <Button
              padding={false}
              onClick={this.handleToggleSidebar}
              onTouchStart={this.handleToggleSidebar}
            >
              <Icon
                name="burger-menu"
                className="-small"
              />
            </Button>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderMobile;
