import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './toggle-switch-styles.scss';

class ToggleSwitch extends Component {

  static propTypes = {
    enabled: PropTypes.bool,
    onStateChanged: PropTypes.func
  };

  state = { enabled: this.enabledFromProps() }

  enabledFromProps() {
    let { enabled } = this.props;

    // Return enabled if it is a boolean, otherwise false
    return enabled ? enabled : false;
  }

  toggleSwitch = evt => {
    evt.persist();
    evt.preventDefault();

    const { onStateChanged } = this.props;

    this.setState({ enabled: !this.state.enabled }, () => {
      const state = this.state;

      // Execute the callback functions
      if (typeof onStateChanged === "function") {
        onStateChanged(state);
      }
    });
  };

  render() {
    const { enabled } = this.state;

    // Isolate special props and store the remaining as restProps
    const { enabled: _enabled, onStateChanged, ...restProps } = this.props;

    return (
      <div>
        <style jsx>{styles}</style>
        <div className="switch switch-default" onClick={this.toggleSwitch} {...restProps}>
          <div className={`switch-toggle ${ enabled  ? 'switch-toggle-on' : 'switch-toggle-off'}`}></div>
        </div>
      </div>
    );
  }
}

export default ToggleSwitch;
