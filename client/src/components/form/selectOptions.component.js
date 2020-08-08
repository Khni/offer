import React, { Component } from 'react';
import InputCss from './inputFrom.css';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.id } className={ this.props.className}>{ this.props.label }</label>
        <select  name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className="input-text-admin"
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
         required   >
         
         <select name="category" id="category">
            {this.props.categories.map((c)=> {

              return<option value={c._id}>{c.name}</option>
 
                       })}
 

                </select>
         </select>
      </div>
    );
  }
}