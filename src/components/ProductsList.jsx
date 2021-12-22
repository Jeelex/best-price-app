import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListItem from "./ProductsListItem";
import { useLocation } from "react-router-dom";

function ProductsList() {
	const [productsList, setProductsList] = useState([]);

	const location = useLocation();
	const { from } = location.state;
	const [pageNo, setPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);

	async function getProductsList() {
		// console.log("category", from);
		const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;
		// how to add pagination later:
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=1&limit=2`;
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=${pageNo}&limit=2`;

		try {
			const firstResponse = await fetch(API);
			const allData = await firstResponse.json();
			setTotalNumberOfProducts(allData.length)
			const response = await fetch(API + `?page=${pageNo}&limit=15`);
			const data = await response.json();
			setProductsList(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getProductsList();
	}, [pageNo]);

	function renderPreviousPage() {
		console.log("before Prev", pageNo);
		if (pageNo >= 2) {
			setPageNo(pageNo - 1);
		}
		// console.log("after Prev", pageNo);
	}
	function renderNextPage() {
		console.log("before Next", pageNo);
		if (pageNo < totalNumberOfProducts) {
			setPageNo(pageNo + 1);
		}
	}
	console.log("pageNo", pageNo);

	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<h2>A listing page, which will have a list of products.</h2>
			<div>
				<input
					type="range"
					name="price-range"
					id="price-range"
					min="0"
					max="5000"
				/>
			</div>
			<button onClick={renderPreviousPage}>previous</button>
			<button onClick={renderNextPage}>next</button>
			<div>
				{/* {from.price} */}
				{productsList.map((product) => (
					<ProductsListItem key={product.id} item={product} />
					))}
			</div>
					<button onClick={renderPreviousPage}>previous</button>
					<button onClick={renderNextPage}>next</button>
		</div>
	);
}

export default ProductsList;
