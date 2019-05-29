import React from 'react';
import classNames from 'classnames';

class InputError extends React.Component {
  constructor(props) {
    super(props);
  }

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

export { InputError };
