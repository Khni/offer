let langObj = {}
const fs = require('fs');


//read file and return JSON obj
const readFile = (path) => {
	
let rawdata = fs.readFileSync(path);
let data = JSON.parse(rawdata);


return data

	} 

//set language 
const setLang = (lang) => {
	if(!lang && lang === 'en') {
		langObj = readFile('en.json')
		} 
		if(lang === 'ar' ) {
		langObj = readFile('ar.json')
		} 

return langObj
}

module.exports = setLang