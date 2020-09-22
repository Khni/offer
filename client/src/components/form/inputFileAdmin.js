import React, { Component } from 'react';
import InputCss from './inputAdminForm.scss';
export default class CustomInput extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }


  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { input: { value, onChange } } = this.props;
    return (
      
      <div className="form-group-admin">
        
        <label htmlFor={ this.props.id } className="label-input-admin">{ this.props.label }</label>
       <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className="inputText-admin"
          type='file'
         // value={ value }
          onChange={this.onChange}
         required   
          oninvalid="this.setCustomValidity('The Field can not be Empty ')"
    oninput="this.setCustomValidity('')"  /> 
  
      </div>
    );
  }
}