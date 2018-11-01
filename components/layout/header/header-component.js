import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';


// components
import LanguageBar from 'components/layout/header/language-bar';
import NavBar from 'components/layout/header/nav-bar';

// styles
import styles from './header-styles.scss';

class Header extends PureComponent {
  static propTypes = {
    root: PropTypes.string.isRequired,
    currentLanguage: PropTypes.string.isRequired }

  render() {
    const { root, currentLanguage } = this.props;

    const logo = root === 'index' ?
      'RMI_Index_Color' : 'RMI_Foundation_Color';

    console.log('pros', this.props);
    console.log('root', root);
    const headerClass = classnames({
      'c-header': true,
      '-theme-1': root === 'index',
      '-theme-2': root !== 'index'
    });

    return (
      <header className={headerClass}>
        <style jsx>{styles}</style>
        <div className="l-layout">
          <div className="row">
            <div className="col-md-4">
              <div className="logo">
                <Link
                  route={root}
                  params={{ language: currentLanguage }}
                >
                  <a><img className="logo-img" src={`/static/logos/${logo}.svg`} alt="RMI logo" /></a>
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row float-right">
                <LanguageBar />
              </div>
              <div className="row float-right">
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
