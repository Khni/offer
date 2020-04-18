import React , {Component} from 'react';
import HomeMenustyle from './homeMenu.css';
import HomeMenuData from './items.js';
import Section from '../section/section.js';

class homeMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
      collections: HomeMenuData
    };
	}
	
	render() {
		
		return(
		<div className="full-menu">
		{this.state.collections.map((col)=>
  <Section key={col.id}  items={col.items} title={col.title} />
    )}
		</div>
  
		);
		
	}
	
	 
	
	
	
}

export default homeMenu;