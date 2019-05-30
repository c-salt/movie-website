import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class InputError extends React.Component {
  render() {
    const errorClass = classNames({

      error_container: true,
      visible: this.props.errorVisible,
      invisible: !this.props.errorVisible,
    });
    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    );
  }
}

InputError.propTypes = {
  errorVisible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export { InputError };
