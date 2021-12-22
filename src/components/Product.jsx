import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Product() {
	const [product, setProduct] = useState({});
	const location = useLocation();
	const { from } = location.state;

	async function getProduct() {
		console.log("product id", from);
		const API = `http://bp-interview.herokuapp.com/products/${from}`;

		try {
			const response = await fetch(API);
			const data = await response.json();
			// console.log(data);
			setProduct(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getProduct();
		// setProductsList(getProductsList);
	}, []);

	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<h2>
				A details page, which will have more details about the chosen product.
			</h2>
			<img src={product.image_url} alt={`${product.title} thumbnail`} />
			<h3>{product.title}</h3>
			<p>{product.price}</p>
		</div>
	);
}

export default Product;
