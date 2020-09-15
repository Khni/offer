import React , {Component}  from 'react'
import Searchboxstyle from './searchbox.scss'
class Searchbox extends Component {

constructor(props){
		super(props);
	
	
  }

  searchUpdate(event) {
    this.props.SearchChange()
  }

render() {
    return (

        <input type="text"   className="input-text-searchbox"    placeholder="search..."      value={this.props.SearchVal} onChange={this.searchUpdate.bind(this)}   />
    );
} 
}

export default Searchbox;