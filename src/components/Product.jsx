import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

function Product() {
	const [product, setProduct] = useState([]);

	async function getProduct(productId) {
		const API = `http://bp-interview.herokuapp.com/products/${productId}`;

		try {
			const response = await fetch(API);
			const data = await response.json();
			console.log(data);
			setProduct(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getProduct("2156054083");
		console.log(product);
		// setProductsList(getProductsList);
	}, []);

	return (
		<div>
			<ProductItem key={product.id} product={product} />
		</div>
	);
}

export default Product;
