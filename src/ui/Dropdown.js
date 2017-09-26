import React, { Component } from 'react';

export default class Dropdown extends Component {
    render() {

        const { options, ...props } = this.props;

        return <div>
            <select className='block' {...props}>
                {options.map(option => <option value={option.value}>{option.name}</option>)}
            </select></div>;
    }
}