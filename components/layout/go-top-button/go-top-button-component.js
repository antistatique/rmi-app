import React, { PureComponent } from 'react';

import Button from 'components/common/button';

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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <div className="c-go-top-button">
        <style jsx>{styles}</style>
        { this.state.show && <button onClick={this.goToTop} className="go-top-button">Hello</button> }
      </div>
    );
  }
}

export default GoTopButton;
