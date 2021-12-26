export function addFloatingPoint(productPrice) {
	const priceOriginal = productPrice && productPrice.toString();
	const array = priceOriginal && priceOriginal.split("");
	array && array.splice(array.length - 2, 0, ".");
	const arrayToString = array && array.join("");
	const priceWithPeriod = parseFloat(arrayToString);

	return priceWithPeriod;
}

export function addDescription(item) {
	return { __html: item.description };
}
