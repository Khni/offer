import React, { Component } from 'react';
import InputCss from './inputSettingsForm.scss';
export default class InputSettings extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group-settings">
        <label htmlFor={ this.props.id } className={ this.props.className}>{ this.props.label }</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className="input-text-settings"
          type={ this.props.type }
          value={this.props.val} 
         onChange={ this.props.change}
         required   
           />
      </div>
    );
  }
}