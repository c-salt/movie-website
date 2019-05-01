import React from 'react';
import _ from 'lodash';
import { InputError } from './InputError';
import { Icon } from './Icon';

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			empty: true,
			submitted: false,
			focus: false,
			valid: true,
			hasHelpbox: false,
			helpboxVisible: false,
			helpboxData: false,
			errorVisible: false,
			errorMessage: this.props.errorMessage,
			type: this.props.type
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleChange(e) {
		e.persist();
		//console.log('Before change', this.state);
		//console.log(e.target.value);
		this.setState({
			value: e.target.value,
			empty: _.isEmpty(e.target.value)
		}, () =>{
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
			//console.log('After Change:', this.state);
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
			helpboxVisible: true
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
		console.log('checkRules')

		const helpboxData = {
			minCharacters: !_.isEmpty(value) ? value.length >= parseInt(this.state.minCharacters) : false,
			capitalLetters: !_.isEmpty(value) ? this.hasCapital(value) : false,
			numbers: !_.isEmpty(value) ? this.hasNumber(value) : false,
			words: !_.isEmpty(value) ? this.hasSpecialCharacter(value) : false
		};

		const allHelpboxEntriesValid = (validData.minChars && validData.capitalLetters && validData.numbers && validData.words);

		this.setState({
			helpboxData,
			valid: allHelpboxEntriesValid
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
			//console.log('IT IS VALID');
			this.setState({
				valid: true,
				errorVisible: false
			});
		} else {
			//console.log('IT IS INVALID');
			this.setState({
				valid: false,
				errorVisible: true,
				errorMessage: _.isEmpty(value) ? this.props.emptyMessage : this.props.errorMessage
			});  
		}
	}

	render() {
		return (
			<div className={'form-group' + (this.props.submitted && !this.props.value ? ' has-error' : '')}>
				<label htmlFor={this.state.type}>{this.props.text}</label>
				<input
					type={this.state.type}
					className="form-control"
					name={this.props.referenceKey}
					value={this.state.value}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
				/>
				<div>
				<InputError
					errorVisible={this.state.errorVisible}
					errorMessage={this.state.errorMessage}
				/>
				</div>
			</div>
		)
	}
}

export { Input };