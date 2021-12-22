import React, { useState, useEffect } from "react";
// import { getProductsList } from "../utilityFunctions/utilityfunctions";
import ProductsListItem from "./ProductsListItem";

function ProductsList() {
	const [productsList, setProductsList] = useState([]);

	async function getProductsList(categoryId) {
		const API = `http://bp-interview.herokuapp.com/categories/${categoryId}/products`;

		try {
			const response = await fetch(API);
			const data = await response.json();
			console.log(data);
			setProductsList(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getProductsList(583);
	}, []);

	function test() {
		console.log("item clicked");
	}

	return (
		<div>
			<h2>A listing page, which will have a list of products.</h2>
			<div onClick={test}>
				{productsList.map((product) => (
					<ProductsListItem key={product.id} item={product} />
				))}
			</div>
		</div>
	);
}

export default ProductsList;
