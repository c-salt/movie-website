import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from './Icon';

class Helpbox extends React.Component {
  render() {
    // console.log('Helpbox props:', this.props)
    const validatorClass = classnames({
      password_validator: true,
      visible: this.props.visible,
      invisible: !this.props.visible,
    });

    let helpboxTitle;
    const valid = Object.values(this.props.helpboxData).every(ele => ele.valid === true);
    if (valid && this.props.value !== '') {
      helpboxTitle = (
        <h4 className="validator_title valid">
          {this.props.name}
          {' '}
IS OK
        </h4>
      );
    } else {
      helpboxTitle = (
        <h4 className="validator_title invalid">
          {`${this.props.name} RULES`}
        </h4>
      );
    }
    const ruleMessages = [];

    this.props.helpboxData.forEach((rule) => {
      ruleMessages.push(
        <li key={rule.name} className={classnames({ valid: rule.valid })}>
          <i className="icon_valid">
            <Icon type="circle_tick_filled" />
          </i>
          <i className="icon_invalid">
            <Icon type="circle_error" />
          </i>
          <span className="error_message">{rule.errorMessage}</span>
        </li>,
      );
    });
    return (
      <div className={validatorClass}>
        <div className="validator_container">

          {helpboxTitle}

          <ul className="rules_list">
            { ruleMessages }
          </ul>
        </div>
      </div>
    );
  }
}

Helpbox.propTypes = {
  helpboxData: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export { Helpbox };
