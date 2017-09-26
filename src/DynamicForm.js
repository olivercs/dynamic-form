import React, { Component } from 'react';
import { compact } from 'lodash';
import validator from 'validator';

import DynamicFormHelper from './DynamicFormHelper';
import TextField from './ui/Textfield';
import Dropdown from './ui/Dropdown';
import Container from './ui/Container';

export default class DynamicForm extends Component {

    constructor(props) {
        super();

        this.updateFieldValue = this.updateFieldValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

        this.dynamicFormHelper = new DynamicFormHelper();
        this.dynamicFormHelper.register(TextField, Dropdown, Container);

        const root = this.dynamicFormHelper.buildTree(props.model);
        this.state = {
            errorMessage: '',
            submitted: false,
            root,
            fields: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        const root = this.dynamicFormHelper.buildTree(nextProps.model);
        this.setState({ root });
    }

    componentDidMount() {

        const it = this.dynamicFormHelper.walk(this.state.root);
        let done = false, value;

        while (!done) {
            ({ done, value } = it.next());
            console.log(done, value);
        }

    }

    isValid() {
        const values = Object.values(this.state.fields);
        return values.reduce((valid, field) => valid && field.valid, true);
    }

    validate(node, value = '') {

        if (!node.validations || node.validations.length === 0) {
            return {
                valid: true,
                errorMessage: undefined
            };
        }

        const valid = node.validations.reduce((valid, validationArr) => {
            const [validation, options, negate] = validationArr;
            const isValid = validator[validation](value.toString(), options);

            return valid && (negate ? !isValid : isValid);
        }, true);

        const errors = node.validations.map(validationArr => {
            const [validation, options, negate] = validationArr;
            const isValid = validator[validation](value.toString(), options);

            if (isValid && negate) {
                return `negate-${validation}`;
            }

            if (!isValid && !negate) {
                return validation;
            }

            return null;

        });

        return {
            valid,
            errors: compact(errors)
        };
    }

    updateFieldValue(node, value) {

        const body = {
            value,
            ...this.validate(node, value),
            dirty: true
        };

        const fields = { ...this.state.fields, [node.name]: body };
        this.setState({ fields });

    }

    onChange(node) {
        return event => {
            this.updateFieldValue(node, event.target.value);
        }
    }

    onBlur(node) {
        return event => {
            this.updateFieldValue(node, event.target.value);
        }
    }

    render() {

        return <div>
            {
                this.state.root &&
                this.dynamicFormHelper.renderNode(this.state.root, {}, { onChange: this.onChange, onBlur: this.onBlur })

            }
            {
                this.isValid() &&
                <button onClick={() => this.props.onSubmit(this.state)}>Submit</button>
            }
            <pre>{JSON.stringify(this.state.fields, 0, 2)}</pre>
        </div>;
    }
}