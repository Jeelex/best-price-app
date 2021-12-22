export async function getCategories() {
	const API = "http://bp-interview.herokuapp.com/categories";
	try {
		const response = await fetch(API);
		const data = await response.json();
		return data;
		// setCategories(data);
	} catch (error) {
		console.log(error);
		// setErrorMessage("Something went wrong. Please try again!");
	}
}

export async function getProductsList() {
	const API = "http://bp-interview.herokuapp.com/categories/583/products";
	try {
		const response = await fetch(API);
		const data = await response.json();
		console.log(data);
		return data;
		// setCategories(data);
	} catch (error) {
		console.log(error);
		// setErrorMessage("Something went wrong. Please try again!");
	}
}

export async function getProduct(productId) {
	const API = `http://bp-interview.herokuapp.com/categories/583/products/${productId}`;

	try {
		const response = await fetch(API);
		const data = await response.json();
		console.log(data);
		// return data;
	} catch (error) {
		console.log(error);
		// setErrorMessage("Something went wrong. Please try again!");
	}
}
