import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { InputError } from './InputError';
import { Icon } from './Icon';
import { Helpbox } from './Helpbox'

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			empty: true,
			submitted: false,
			focus: false,
			valid: true,
			hasHelpbox: this.props.hasHelpbox || false,
			helpboxVisible: false,
			helpboxData: {},
			errorVisible: false,
			errorMessage: this.props.errorMessage,
			type: this.props.type
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.mouseEnterError = this.mouseEnterError.bind(this);
		this.mouseLeaveError = this.mouseLeaveError.bind(this);
	}

	handleChange(e) {
		e.persist();

		this.setState({
			value: e.target.value,
			empty: _.isEmpty(e.target.value)
		}, () =>{
			if(this.props.hasHelpbox) {
				this.checkRules(e.target.value)
			}
			// call input's validation method
			if(this.props.validate) {
				this.validateInput(e.target.value);
			}
			// call onChange method on the parent component for updating it's state
			if(this.props.onChange) {
				this.props.onChange(e);
			}
		});
	}

	handleBlur(e) {
		this.setState({
			focus: false,
			helpboxVisible: false,
			errorVisible: !this.state.valid
		});
	}

	handleFocus(e) {
		this.setState({
			focus: true,
			helpboxVisible: true,
			errorVisible: false
		});

	}

	mouseEnterError(e) {
		if (!this.state.hasHelpbox || !this.state.helpboxVisible) {
			this.setState({
				errorVisible: true
			});
		}
	}

	mouseLeaveError(e) {
		if(this.state.focus){
			this.setState({
				errorVisible: false
			});
		}	
	}

	hideError(e) {
		this.setState({
			helpboxVisible: false,
			errorVisible: false
		});
	}

	hasCapital(value) {
		return /[A-Z]/.test(value);
	}

	hasNumber(value) {
		return /\d/.test(value);
	}

	hasSpecialCharacter(value) {
		return /[!@#$%^&*?]/.test(value);
	}

	checkRules(value) {
		const helpboxData = {
			minCharacters: !_.isEmpty(value) ? value.length >= parseInt(this.props.minCharacters) : false,
			capitalLetters: !_.isEmpty(value) ? this.hasCapital(value) : false,
			numbers: !_.isEmpty(value) ? this.hasNumber(value) : false,
			specialCharacters: !_.isEmpty(value) ? this.hasSpecialCharacter(value) : false
		};

		// const helpboxData = {
		// 	minCharacters: {
		// 		valid: !_.isEmpty(value) ? value.length >= parseInt(this.props.minCharacters) : false,
		// 		errorMessage: `The password must be at least ${this.state.minCharacters} characters`
		// 	}, 
		// 	capitalLetters: {
		// 		valid: !_.isEmpty(value) ? this.hasCapital(value) : false,
		// 		errorMessage: 'The password must contain at least one capital letter'
		// 	},
		// 	numbers: { 
		// 		valid: !_.isEmpty(value) ? this.hasNumber(value) : false,
		// 		errorMessage: 'The password must contain at least one number'
		// 	},
		// 	specialCharacters: {
		// 		valid: !_.isEmpty(value) ? this.hasSpecialCharacter(value) : false,
		// 		errorMessage: 'The password must contain at least one special character [!@#$%^&*?]'
		// 	}
		// };

		console.log('Helpbox data:', helpboxData);
		const allHelpboxEntriesValid = (helpboxData.minCharacters && helpboxData.capitalLetters && helpboxData.numbers && helpboxData.specialCharacters);
		// const allHelpboxEntriesValid = (helpboxData.minCharacters.valid && helpboxData.capitalLetters.valid && helpboxData.numbers.valid && helpboxData.specialCharacters.valid);
		console.log('All Entries', allHelpboxEntriesValid)
		this.setState({
			helpboxData,
			valid: allHelpboxEntriesValid
		});
	}

	isValid() {
		this.validateInput(this.state.value);
	}

	validateInput(value) {
		if(this.props.validate && this.props.validate(value)){
			this.setState({
				valid: true,
				errorVisible: false
			});
		} else {
			this.setState({
				valid: false,
				//errorVisible: true,
				errorMessage: _.isEmpty(value) ? this.props.emptyMessage : this.props.errorMessage
			});
		}
	}

	render() {
		console.log('Input state valid', this.state.valid);
		const inputGroupClasses = classnames({
			'input_group':     true,
			'input_valid':     this.state.valid,
			'input_error':     !this.state.valid,
			'input_empty':     this.state.empty,
			'input_hasValue':  !this.state.empty,
			'input_focused':   this.state.focus,
			'input_unfocused': !this.state.focus
		});
		let helpbox;
		if (this.state.hasHelpbox) {
			helpbox = 
				<Helpbox
					ref="helpbox"
					visible={this.state.helpboxVisible}
					name={this.props.text}
					value={this.state.value}
					helpboxData={this.state.helpboxData}
					minCharacters={this.props.minCharacters}
					requireCapitals={this.props.requireCapitals}
					requireNumbers={this.props.requireNumbers}
				/>
		}

		return (
			<div className={inputGroupClasses}>
				<label className="input_label" htmlFor={this.props.text}>
					<span className="label_text">{this.props.text}</span>
				</label>
				<input 
					placeholder={this.props.placeholder} 
					className="input" 
					id={this.props.text}
					value={this.state.value} 
					onChange={this.handleChange} 
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					autoComplete="off"
					referencekey={this.props.referencekey}
					type={this.props.type}
				/>
				<InputError 
					errorVisible={this.state.errorVisible} 
					errorMessage={this.state.errorMessage} 
				/>
				<div className="validationIcons">
					<i className="input_error_icon" onMouseEnter={this.mouseEnterError} onMouseLeave={this.mouseLeaveError}> <Icon type="circle_error"/> </i>
					<i className="input_valid_icon"> <Icon type="circle_tick"/> </i>
				</div>

				{helpbox}
			</div>
		)
	}
}

export { Input };