const fs = require('fs');

var michelinJson = fs.readFileSync("Michelin.json");
var maitreJson = fs.readFileSync("Maitre.json");

var michelinRest = JSON.parse(michelinJson);
var maitreRest = JSON.parse(maitreJson);

var both = [];

michelinRest.forEach(michelin => {	
	maitreRest.forEach(maitre => {
		if(maitre.phone === michelin.phone){
            both.push(JSON.stringify(michelin, null, 2));
            console.log("Adding new restaurant for the Both.json file : ");	
            console.log(michelin);
	    }	
	});
});

console.log("Number of michelin restaurant at the begining :");
console.log(michelinRest.length);
console.log("Number of maitre restaurant at the begining :");
console.log(maitreRest.length);
console.log("Number of restaurant wich phone number match both michelin and maitre :");
console.log(both.length);

fs.appendFileSync('Both.json',"[ \n");
fs.appendFileSync('Both.json',both);
fs.appendFileSync('Both.json',"\n]");
