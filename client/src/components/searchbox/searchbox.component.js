import React, { Component } from 'react'
import './searchbox.scss'
class Searchbox extends Component {

    // constructor(props) {
    //     super(props);


    // }

    searchUpdate(event) {
        // this.props.SearchChange()
    }

    render() {
        return (

            <input type="text" className="input-search-main" placeholder="search..." value={this.props.SearchVal} onChange={this.searchUpdate.bind(this)} />
        );
    }
}

export default Searchbox;