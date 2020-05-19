import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class MapsAndTablesAccordionItem extends PureComponent {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label }
    } = this;

    return (
      <div style={{ borderBottom: '1px solid white' }}>
        <div onClick={onClick} style={{ cursor: 'pointer', fontSize: '24px', marginBottom: '60px', marginTop: '60px' }}>
          <div style={{ float: 'left', color: 'white', paddingRight: '20px' }}>
            {!isOpen && <span style={{ fontSize: '30px' }}>&#43;</span>}
            {isOpen && <span style={{ fontSize: '30px' }}>&#8722;</span>}
          </div>
          <span style={{ color: 'white' }}>{label}</span>
        </div>
        {isOpen &&
          <div style={{ padding: '10px' }}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

export default MapsAndTablesAccordionItem;
