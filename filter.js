var electronicsList = [];
var necessitiesList = [];
var weirdStuffList = [];

function filterElectronics(){
	cb = document.querySelector('#catElectronics');
	if (cb.checked === false){
		DeleteRequest("electronics");
	}
	else {
		AddRequest("electronics");
	}
}

function filterNecessities(){
	cb = document.querySelector('#catNecessities');
	if (cb.checked === false){
		DeleteRequest("necessities");
	}
	else {
		AddRequest("necessities");
	}
}

function filterWeirdStuff(){
	cb = document.querySelector('#catWeirdStuff');
	if (cb.checked === false){
		DeleteRequest("weirdStuff");
	}
	else {
		AddRequest("weirdStuff");
	}
}

function DeleteRequest(items){
	productCat = document.querySelectorAll(`.${items}`);
	if (items === "electronics"){
		productCat.forEach(product => {
		product.remove();
		electronicsList.push(product);
		});
	}
	else if (items === "necessities"){
		productCat.forEach(product => {
		product.remove();
		necessitiesList.push(product);
		});
	}
	else if (items === "weirdStuff"){
		productCat.forEach(product => {
		product.remove();
		weirdStuffList.push(product);
		});
	}
	
}

function AddRequest(items){
	productList = document.getElementById("productList");
	if (items === "electronics"){
		electronicsList.forEach(product => {
			productList.appendChild(product);
		})
	}
	else if (items === "necessities"){
		necessitiesList.forEach(product => {
			productList.appendChild(product);
		})
	}
	else if (items === "weirdStuff"){
		weirdStuffList.forEach(product => {
			productList.appendChild(product);
		})
	}
}

