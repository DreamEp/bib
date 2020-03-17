const fs = require('fs');

var michelinJson = fs.readFileSync("Michelin.json");
var maitreJson = fs.readFileSync("Maitre.json");

var michelinRest = JSON.parse(michelinJson);
var maitreRest = JSON.parse(maitreJson);

var bib = [];

michelinRest.forEach(michelin => {	
	maitreRest.forEach(maitre => {
		if(maitre.phone === michelin.phone){
            bib.push(JSON.stringify(michelin, null, 2));
            console.log("Adding new restaurant for the bib.json file : ");	
            console.log(michelin);
	    }	
	});
});

console.log("Number of michelin restaurant at the begining :");
console.log(michelinRest.length);
console.log("Number of maitre restaurant at the begining :");
console.log(maitreRest.length);
console.log("Number of restaurant wich phone number match bib michelin and maitre :");
console.log(bib.length);

fs.appendFileSync('Bib.json',"[ \n");
fs.appendFileSync('Bib.json',bib);
fs.appendFileSync('Bib.json',"\n]");
