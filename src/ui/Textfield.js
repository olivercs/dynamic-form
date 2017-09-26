import React, { Component } from 'react';

export default class TextField extends Component {
    render() {
        return <div><input type="text" className='block' {...this.props} /></div>;
    }
}