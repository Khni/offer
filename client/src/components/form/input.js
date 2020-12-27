import React, { Component } from 'react';
import  './inputFrom.css';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div class="user-input-wrp">
        {/* <label htmlFor={ this.props.id } className="floating-label">Name</label> */}
        <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
        /*  className={this.props.classN}*/
        className="inputText" 
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
          // placeholder={this.props.placeholder}
         required   
          oninvalid="this.setCustomValidity('The Field can not be Empty ')"
    oninput="this.setCustomValidity('')"  />
     <span className="floating-label">{this.props.placeholder}</span>
  </div>
    );
  }
}