import React, { useState, useEffect } from "react";
import { getProductsList } from "../utilityFunctions/utilityfunctions";
import Item from "./Item";

function ProductsList() {
	const [productsList, setProductsList] = useState([]);

	async function getProductsList() {
		const API = "http://bp-interview.herokuapp.com/categories/583/products";
		try {
			const response = await fetch(API);
			const data = await response.json();
			// console.log(data);
			setProductsList(data);
			// return data;
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
		
	}

	useEffect(() => {
		getProductsList();
		// setProductsList(getProductsList);
	}, []);

	return (
		<div>
			<h2>A listing page, which will have a list of products.</h2>
			<div>
				{productsList.map((product) => (
					<Item key={product.id} category={product} />
				))}
			</div>
		</div>
	);
}

export default ProductsList;
