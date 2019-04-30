import React from 'react';
import _ from 'lodash'

class PasswordValidator extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: null,
      hasCapital: this.props.hasCapital,
      hasSpecialCharacter: this.props.hasSpecialCharacter,
      hasForbiddenWord: this.props.hasForbiddenWord,
      name: this.props.name
    };
  }

    render() {
      return(
        <div> </div>
      )
    }



}

export { PasswordValidator };
