import React, { PureComponent } from 'react';

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

  shouldShow() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  goToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  render() {
    return (
      <div className="c-go-top-button">
        <style jsx>{styles}</style>
        {<button onClick={this.goToTop} className={'go-top-button ' + (this.state.show ? 'go-top-button-show' : '')}>
          <Icon name="arrow-up" className="-big" />
        </button> }
      </div>
    );
  }
}

export default GoTopButton;
