import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';


// components
import NavBar from 'components/layout/header/nav-bar';

// styles
import styles from './header-styles.scss';

class Header extends PureComponent {
  static propTypes = {
    root: PropTypes.string.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  render() {
    const { root, currentLanguage } = this.props;

    return (
      <header className="c-header">
        <style jsx>{styles}</style>
        <div className="l-layout">
          <div className="row">
            <div className="col-xs-5">
              <Link
                route={root}
                params={{ language: currentLanguage }}
              >
                <a className="logo">
                  <img className="logo-img" src="/static/logos/RMI_Index_Color.svg" alt="RMI logo" />
                  <span className="logo-year">2022</span>
                </a>
              </Link>
            </div>
            <div className="col-xs-7" style={{ overflowX: 'auto' }}>
              <div className="float-right">
                <NavBar />
              </div>
            </div>
          </div>
        </div>

      </header>
    );
  }
}

export default Header;
