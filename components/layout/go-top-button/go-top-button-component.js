import React, { PureComponent } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Icon from 'components/common/icon';

// styles
import styles from './go-top-button-styles.scss';

class GoTopButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  componentDidMount() {
    window.onscroll = () => (this.shouldShow());
  }

  handleClick = () => {
    scroll.scrollToTop();
  }

  shouldShow() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    return (
      <div className="c-go-top-button">
        <style jsx>{styles}</style>
        <a className={`go-top-button ${this.state.show ? 'go-top-button-show' : ''}`} onClick={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
          <Icon name="arrow-up" className="c-icon" />
        </a>
      </div>
    );
  }
}

export default GoTopButton;
