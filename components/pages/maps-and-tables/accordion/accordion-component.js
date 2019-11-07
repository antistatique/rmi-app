import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MapsAndTablesAccordionItem from './accordion-item';

class MapsAndTablesAccordion extends PureComponent {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired
  }

  static defaultProps = { allowMultipleOpen: false }

  constructor(props) {
    super(props);

    const openSections = {};

    React.Children.forEach(this.props.children, (child) => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = (label) => {
    const {
      props: { allowMultipleOpen },
      state: { openSections }
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen
        }
      });
    } else {
      this.setState({ openSections: { [label]: !isOpen } });
    }
  }

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections }
    } = this;

    return (
      <div style={{ backgroundColor: '#22304E', padding: '10px' }}>
        {React.Children.map(children, child => (
          <MapsAndTablesAccordionItem
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={onClick}
          >
            {child.props.children}
          </MapsAndTablesAccordionItem>
        ))}
      </div>
    );
  }
}

export default MapsAndTablesAccordion;
