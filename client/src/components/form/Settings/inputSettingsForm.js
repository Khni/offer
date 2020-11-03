import React, { Component } from 'react';
import InputCss from './inputSettingsForm.scss';
class InputSettings extends Component {
  render() {
   // const { input: { value, onChange } } = this.props;
    //const { input: { val, change } } = this.props;
    return (
      <div className="user-input-wrp">
        
       <input 
       className="inputText" 
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
           <span className="floating-label">{this.props.label}</span>
      </div>
    );
  }
}

export default InputSettings