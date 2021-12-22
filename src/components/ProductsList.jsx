import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListItem from "./ProductsListItem";
import { useLocation } from "react-router-dom";

function ProductsList() {
	const [productsList, setProductsList] = useState([]);

	const location = useLocation();
	const { from } = location.state;

	async function getProductsList() {
		// console.log("category", from);
		const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;
		// how to add pagination later:
		// const API = `http://bp-interview.herokuapp.com/categories/${categoryId}/products?page=1&limit=2`;

		try {
			const response = await fetch(API);
			const data = await response.json();
			// console.log(data);
			setProductsList(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getProductsList();
	}, []);

	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<h2>A listing page, which will have a list of products.</h2>
			<div>
				{productsList.map((product) => (
					<ProductsListItem key={product.id} item={product} />
				))}
			</div>
		</div>
	);
}

export default ProductsList;
