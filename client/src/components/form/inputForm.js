import React, { Component } from 'react';
import InputCss from './inputFrom.css';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.id } className="label-auth">{ this.props.label }</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className={ this.props.className }
          type={ this.props.type }
          value={ value }
          onChange={ onChange }

        />
      </div>
    );
  }
}