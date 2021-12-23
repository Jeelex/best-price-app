import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListItem from "./ProductsListItem";
import { useLocation } from "react-router-dom";

function ProductsList() {
	const location = useLocation();
	const { from } = location.state;
	const [productsList, setProductsList] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);

	const [originalData, setOriginalData] = useState([]);
	const [islowToHigh, setIsLowToHigh] = useState(false);

	const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;
	let specificPageAPI = API + `?page=${pageNo}&limit=${maxProductsPerPage}`;

	async function getProductsList() {
		// how to add pagination later:
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=1&limit=2`;
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=${pageNo}&limit=2`;

		try {
			const firstResponse = await fetch(API);
			const allData = await firstResponse.json();
			setTotalNumberOfProducts(allData.length);
			setOriginalData(allData);

			const response = await fetch(specificPageAPI);
			const data = await response.json();
			// console.log(data);
			setProductsList(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
		console.log("data initial", originalData);
	}

	useEffect(() => {
		getProductsList();
	}, [pageNo]);

	function renderPreviousPage() {
		if (pageNo >= 2) {
			setPageNo(pageNo - 1);
		}
		console.log("pageNo", pageNo);
	}
	function renderNextPage() {
		if (pageNo < maxPageNumber) {
			setPageNo(pageNo + 1);
		}
		console.log("pageNo", pageNo);
	}

	function sortByPrice() {
		if (islowToHigh) {
			// originalData.sort((a, b) => b.price - a.price);
			setPageNo(1)
		} else {
			// originalData.sort((a, b) => a.price - b.price);
			setPageNo(maxPageNumber)
		}
		setIsLowToHigh(!islowToHigh);
		// console.log("originalData SORTED", originalData);
	}
	// console.log("islowToHigh", islowToHigh)

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
				<button onClick={sortByPrice}>{`Sort by ${
					islowToHigh ? "Low" : "High"
				} Price`}</button>
			</div>

			<button
				style={{ opacity: pageNo >= 2 ? 1 : 0.5 }}
				onClick={renderPreviousPage}
			>
				previous
			</button>
			<button
				style={{ opacity: pageNo < maxPageNumber ? 1 : 0.5 }}
				onClick={renderNextPage}
			>
				next
			</button>
			<div>
				{productsList
					.sort((a, b) => (islowToHigh ? b.price - a.price : a.price - b.price))
					.map((product) => (
						<ProductsListItem key={product.id} item={product} />
					))}
			</div>
			<button
				style={{ opacity: pageNo >= 2 ? 1 : 0.5 }}
				onClick={renderPreviousPage}
			>
				previous
			</button>
			<button
				style={{ opacity: pageNo < maxPageNumber ? 1 : 0.5 }}
				onClick={renderNextPage}
			>
				next
			</button>
		</div>
	);
}

export default ProductsList;
