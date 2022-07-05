function checkPrice(){
	var priceList = [];
	var priceNameDict = {};
	parent = document.getElementById('productList');
	priceChildren = parent.querySelectorAll('.price');
	nameChildren = parent.querySelectorAll('h4');
	for (i = 0; i < priceChildren.length; i++){	
		price = parseFloat(priceChildren[i].textContent.slice(1,));

		if (price in priceNameDict) {
			currentList = priceNameDict[price];
			currentList.push(nameChildren[i].textContent.trim());
			priceNameDict[price] = currentList;
		}
		else{
			priceNameDict[price] = [nameChildren[i].textContent.trim()];
		}

		priceList.push(price);
	}	
	return {priceList, priceNameDict};
}

function ascendPrice(priceList, priceNameDict){
	priceList.sort(function(a,b) { return a - b;});
	for (i = 0; i < priceList.length; i++){
		productContainer = document.getElementById(priceNameDict[priceList[i]][0]);
		if (priceNameDict[priceList[i]].length > 1){
			currentList = priceNameDict[priceList[i]];
			currentList.shift();
		}
		document.getElementById("productList").appendChild(productContainer);
	}
}

function descendPrice(priceList, priceNameDict){
	priceList.sort(function(a,b) { return b - a;});
	for (i = 0; i < priceList.length; i++){
		productContainer = document.getElementById(priceNameDict[priceList[i]][0]);
		if (priceNameDict[priceList[i]].length > 1){
			currentList = priceNameDict[priceList[i]];
			currentList.shift();
		}
		document.getElementById("productList").appendChild(productContainer);
	}
}

function checkRating(){
	var ratingList = [];
	var ratingNameDict = {};
	parent = document.getElementById('productList');
	ratingChildren = parent.querySelectorAll('.ratingValue');
	nameChildren = parent.querySelectorAll('h4');
	for (i = 0; i < ratingChildren.length; i++){
		rating = parseInt(ratingChildren[i].value);

		if (rating in ratingNameDict) {
			currentList = ratingNameDict[rating];
			currentList.push(nameChildren[i].textContent.trim());
			ratingNameDict[rating] = currentList;
		}
		else{
			ratingNameDict[rating] = [nameChildren[i].textContent.trim()];
		}

		ratingList.push(rating);
	}
	return {ratingList, ratingNameDict};
}

function ascendRating(ratingList, ratingNameDict){
	ratingList.sort(function(a,b) { return b - a;});
	for (i = 0; i < ratingList.length; i++){
		productContainer = document.getElementById(ratingNameDict[ratingList[i]][0]);
		if (ratingNameDict[ratingList[i]].length > 1){
			currentList = ratingNameDict[ratingList[i]];
			currentList.shift();
		}
		document.getElementById("productList").appendChild(productContainer);
	}
}

function defaultOrder(){
	//possible to dynamically create the originalOrderID List but not useful
	//default order often has special considerations (priority to products that paid for advertisements, etc.)
	//probably more useful to just manually type the order out 
	originalOrderID = ["Math Teacher in a Pocket", "Money Container", "Vitamin C", "Old Tissue Paper", "New Tissue Paper", "Some Rock", "Functional Pencil", "Waxed Dental Floss"]
	parent = document.getElementById('productList');
	for (i = 0; i < originalOrderID.length; i++){
		try {
		  productContainer = document.getElementById(originalOrderID[i]);
		  parent.appendChild(productContainer);
		} catch (TypeErorr) {
		  console.log("product filtered away");
		}
	}
}

function sortRequest(){
    criterion = document.getElementById("sortingCriteria").value;
	if (criterion === "P_Ascending"){
		let values = checkPrice();
		let priceList = values.priceList;
			priceNameDict = values.priceNameDict;
		ascendPrice(priceList, priceNameDict);
	}
	else if (criterion === "P_Descending"){
		let values = checkPrice();
		let priceList = values.priceList;
			priceNameDict = values.priceNameDict;
		descendPrice(priceList, priceNameDict);
	}
	else if (criterion === "Rating"){
		let values = checkRating();
		let ratingList = values.ratingList;
			ratingNameDict = values.ratingNameDict;
		ascendRating(ratingList, ratingNameDict);
	}
	else if (criterion === "Default"){
		defaultOrder();
	}
}
