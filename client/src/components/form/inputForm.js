import React, { Component } from 'react';
import   './input.scss';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <table className="juv-form-group">
        <tr>
        <label htmlFor={ this.props.id } className={ this.props.labelClass}>{ /*this.props.label*/ }</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className={this.props.classN}
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
          placeholder={this.props.placeholder}
         required   
          oninvalid="this.setCustomValidity('The Field can not be Empty ')"
    oninput="this.setCustomValidity('')"  />
    
    </tr>
      </table>
    );
  }
}