import React from 'react';
import _ from 'lodash';
import { InputError } from './InputError';

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: null,
			empty: true,
			email: '',
			submitted: false,
			focus: false,
			valid: false,
			validator: false,
			validatorVisible: false,
			isValidatorValid: false,
			allValidatorValid: false,
			errorVisible: false,
			errorMessage: this.props.errorMessage,
			type: this.props.type
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleChange(e) {
		console.log('Before change', this.state);
		console.log(e.target.value);
		this.setState({
			value: e.target.value,
			empty: _.isEmpty(e.target.value)
		});

		if(this.props.validator) {
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
		console.log('After Change:', this.state);
	}

	handleBlur(e) {
		this.setState({
			focus: false,
			validatorVisible: false,
			errorVisible: !this.state.valid
		});
	}

	handleFocus(e) {
		this.setState({
			focus: true,
			validatorVisible: true
		});

		if (this.props.validator) {
			this.setState({
				errorVisible: false
			});
		}
	}

	mouseEnterError(e) {
		console.log('mouseEnterError')
		this.setState({
			errorVisible: false
		});
	}

	hideError(e) {
		console.log('hideError')
		this.setState({
			validatorVisible: false,
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
		console.log('checkRules')

		const validData = {
			minCharacters: !_.isEmpty(value) ? value.length >= parseInt(this.state.minCharacters) : false,
			capitalLetters: !_.isEmpty(value) ? this.hasCapital(value) : false,
			numbers: !_.isEmpty(value) ? this.hasNumber(value) : false,
			words: !_.isEmpty(value) ? this.hasSpecialCharacter(value) : false
		};

		const allValid = (validData.minChars && validData.capitalLetters && validData.numbers && validData.words);

		this.setState({
			isValidatorValid: validData,
			allValidatorValid: allValid,
			valid: allValid
		});
	}

	isValid() {
		if (this.props.validate) {
			if (_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
				this.setState({
					valid: false,
					errorVisible: true
				});
			}
		}
	}

	validateInput(value) {
		console.log('validateInput');
		if(this.props.validate && this.props.validate(value)){
			this.setState({
				valid: true,
				errorVisible: false
			});
		} else {
			this.setState({
				valid: false,
				errorMessage: _.isEmpty(value) ? this.props.emptyMessage : this.props.errorMessage
			});  
		}
	}

	render() {
		return (
			// <div className="col-md-6 col-md-offset-3">

			//     <label className="input_label" htmlFor={this.props.text}>
			//         <span className="label_text">{this.props.text}</span>
			//     </label>

			//     <input
			//         {...this.props}
			//         placeholder={this.props.placeholder}
			//         className="input"
			//         id={this.props.text}
			//         defaultValue={this.props.defaultValue}
			//         value={this.state.value}
			//         onChange={this.handleChange}
			//         // onFocus={this.handleFocus}
			//         // onBlur={this.handleBlur}
			//         autoComplete="off"
			//     />

			//     {/* <InputError
			//         visible={this.state.errorVisible}
			//         errorMessage={this.state.errorMessage}
			//     /> */}

			//     {/* <div className="validationIcons">
			//         <i className="input_error_icon" onMouseEnter={this.mouseEnterError}> <Icon type="circle_error"/> </i>
			//         <i className="input_valid_icon"> <Icon type="circle_tick"/> </i>
			//     </div> */}

			//     {/* { validator } */}

			// </div>

			<div className={'form-group' + (this.props.submitted && !this.props.email ? ' has-error' : '')}>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					className="form-control"
					name="email"
					value={this.props.email}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
				/>
				<div>
				<InputError
					errorVisible={this.state.errorVisible}
					errorMessage="Email is wrong"
				/>
				</div>
			</div>
		)
	}
}

export { Input };
