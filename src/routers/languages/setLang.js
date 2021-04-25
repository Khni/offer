let langObj = {}
const fs = require('fs');

console.log("test");
//read file and return JSON obj
const readFile = (path) => {
	console.log("best");
let rawdata = fs.readFileSync(path);
let data = JSON.parse(rawdata);


return data

	} 

//set language 
const setLang = (lang) => {
	//UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open
	if(!lang || lang === 'en') {
		
		langObj = readFile('en.json')
		
		} 
		console.log('none');
		if(lang === 'ar' ) {
			
		langObj = readFile('ar.json')
		} 

return langObj
}


module.exports = {setLang}