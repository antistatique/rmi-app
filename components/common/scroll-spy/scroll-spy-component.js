import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import styles from '../scroll-spy/scroll-spy-styles.scss';

class ScrollSpy extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    currentClassName: PropTypes.string.isRequired,
    offset: PropTypes.number
  };

  static defaultProps = { offset: 0 };

  constructor(props) {
    super(props);

    this.state = { currentTarget: '' };
  }

  componentDidMount() {
    const that = this;

    // listen for scroll events.
    window.addEventListener('scroll', this.handleSpy.bind(that));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleSpy);
  }

  getScrollDimension = () => {
    const doc = document;
    const scrollTop = (
      doc.documentElement.scrollTop ||
      doc.body.parentNode.scrollTop ||
      doc.body.scrollTop
    );
    const scrollHeight = (
      doc.documentElement.scrollHeight ||
      doc.body.parentNode.scrollHeight ||
      doc.body.scrollHeight
    );

    return {
      scrollTop,
      scrollHeight
    };
  }

  handleSpy() {
    const targets = this.props.items.map((item) => {
      return document.getElementById(item.anchor);
    });

    targets.forEach((el) => {
      const isInView = this.isInView(el);


      if (isInView) {
        // hasInViewAlready = true
        this.setState({ currentTarget: el.getAttribute('id') });
      }
    });
  }

  isInView(el) {
    if (!el) {
      return false;
    }

    const { offset } = this.props;
    const { scrollTop } = this.getScrollDimension();

    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight;

    const scrollBottom = scrollTop + winH;
    const elTop = rect.top + scrollTop + offset;
    const elBottom = elTop + el.offsetHeight;

    return (elTop < scrollBottom) && (elBottom > scrollTop);
  }

  render() {
    const { items, currentClassName } = this.props;
    const { currentTarget } = this.state;

    return (
      <ul className="anchor-navigation d-flex justify-content-between">
        <style jsx>{styles}</style>
        {items.map(item => (
          <li
            key={item.anchor}
            className={`anchor-nav-item ${currentTarget === item.anchor ? currentClassName : ''}`}
          >
            <AnchorLink offset="350" href={`#${item.anchor}`}>{item.label}</AnchorLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default ScrollSpy;
