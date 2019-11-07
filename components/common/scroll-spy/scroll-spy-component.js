import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/common/select';
import { animateScroll as scroll, scroller } from 'react-scroll';

class ScrollSpy extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
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
    const targets = this.props.items.map(item => document.getElementById(item.anchor));

    targets.forEach((el) => {
      const isInView = this.isInView(el);

      if (isInView) {
        // hasInViewAlready = true
        this.setState({ currentTarget: el.getAttribute('id') });
      }
    });
  }

  handleChange = ({ value }) => {
    if (value == null) {
      scroll.scrollToTop();
    } else {
      scroller.scrollTo(value, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -250
      });
    }
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
    const { items } = this.props;
    const { currentTarget } = this.state;

    const selectItems = items.map(item => ({ label: item.label, value: item.anchor }));

    return (
      <Select
        placeholder="Quick access"
        options={selectItems}
        selectedValue={currentTarget}
        onChange={this.handleChange}
        className=""
        hideResetButton
      />
    );
  }
}

export default ScrollSpy;
