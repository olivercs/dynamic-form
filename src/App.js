import React, { Component } from 'react';
import './App.scss';
import Model from './Model';
import DynamicForm from './DynamicForm';

class App extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(payload) {
    console.log(payload);
  }

  render() {
    return (
      <div className="App">
        <DynamicForm model={Model} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
