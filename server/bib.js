const fs = require('fs');
//Get both json file
var michelinJson = fs.readFileSync("Michelin.json");
var maitreJson = fs.readFileSync("Maitre.json");

//Get each restaurants on both json file by parsing them 
var michelinRest = JSON.parse(michelinJson);
var maitreRest = JSON.parse(maitreJson);

//Create an array called bib
var bib = [];

//Loop through the array of michelin restaurant and maitre restaurant
michelinRest.forEach(michelin => {	
	maitreRest.forEach(maitre => {
		//Check the phones value in each restaurants and push the restaurant in our bib array if both get the same phone
		if(maitre.phone === michelin.phone){
			//push the michelin restaurant in json format who got the same phone of the maitre restaurant
			//we decide michelin one because we took more datas in the michelin one
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

//Then write our new json file Bib.json with the restaurant who got both distinction
fs.appendFileSync('Bib.json',"[ \n");
fs.appendFileSync('Bib.json',bib);
fs.appendFileSync('Bib.json',"\n]");
