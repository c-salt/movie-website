import React from 'react';
import _ from 'lodash'
import classnames from 'classnames'
import { Icon } from './Icon'

class Helpbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: null,
      hasCapital: this.props.hasCapital,
      hasSpecialCharacter: this.props.hasSpecialCharacter,
      name: this.props.name
    };
  }

  render() {
    // console.log('Helpbox props:', this.props)
    const validatorClass = classnames({
      'password_validator': true,
      'visible': this.props.visible,
      'invisible': !this.props.visible
    });

    let helpboxTitle;
    let valid = Object.values(this.props.helpboxData).every( ele => ele === true );
    if(valid && this.props.value != '') {
      helpboxTitle = 
        <h4 className="validator_title valid">
          {this.props.name} IS OK
        </h4>
    } else {
      helpboxTitle = 
        <h4 className="validator_title invalid">
          {this.props.name} RULES
        </h4>
    }

    return(
      <div className={validatorClass}>
      <div className="validator_container">

        {helpboxTitle}

        <ul className="rules_list">
      
          <li className={classnames({'valid': this.props.helpboxData.minCharacters})}> 
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.props.minCharacters} characters minimum</span>
          </li>

          <li className={classnames({'valid': this.props.helpboxData.capitalLetters})}> 
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">Contains at least {this.state.requireCapitals} capital letter</span>
          </li>

          <li className={classnames({'valid': this.props.helpboxData.numbers})}> 
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">Contains at least {this.state.requireNumbers} number</span>
          </li>

          <li className={classnames({'valid': this.props.helpboxData.specialCharacters})}> 
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">Contains at least {this.state.requireNumbers} special character</span>
          </li>

        </ul>
      </div>
    </div>
    )
  }



}

export { Helpbox };
