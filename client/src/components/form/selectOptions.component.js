import React, { Component } from 'react';
//import InputCss from './inputFrom.css';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group-select">
        <label htmlFor={ this.props.id } className={ this.props.className}>{ this.props.label }</label>
        <select  name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className="input-select-admin"
          
          
         onChange={ onChange }
         required 
           >
         
         <option>Choose Category</option>
            {this.props.sections.map((s)=> {
                 
              return<option value={s._id}>{s.name}</option>
 
                       })}
 

               
               
         </select>
      </div>
    );
  }
}