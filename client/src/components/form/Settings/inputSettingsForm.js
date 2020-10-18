import React, { Component } from 'react';
import InputCss from './inputSettingsForm.scss';
export default class InputSettings extends Component {
  render() {
   // const { input: { value, onChange } } = this.props;
    //const { input: { val, change } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.id }  class="input-label">{ this.props.label }</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
         className="juv-input-form-set"
          type={ this.props.type }
     value={this.props.val} 
     onChange={ this.props.change}
  // value={ value}
 //   onChange={ onChange }
        // required   
           />
      </div>
    );
  }
}