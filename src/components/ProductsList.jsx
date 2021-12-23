import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListItem from "./ProductsListItem";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

function ProductsList() {
	const location = useLocation();
	console.log(location)
	// const { pathname } = location;
	// console.log(pathname)
	const { from } = location.state;
	const [productsList, setProductsList] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);

	let [searchParams, setSearchParams] = useSearchParams();
	let navigate = useNavigate();
	

	async function getProductsList() {
		// console.log("category", from);
		const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;
		// how to add pagination later:
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=1&limit=2`;
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=${pageNo}&limit=2`;

		try {
			const firstResponse = await fetch(API);
			const allData = await firstResponse.json();
			setTotalNumberOfProducts(allData.length);
			const response = await fetch(
				API + `?page=${pageNo}&limit=${maxProductsPerPage}`
			);
			const data = await response.json();
			console.log(data);
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
		if (pageNo >= 2) {
			setPageNo(pageNo - 1);
			// navigate(-1)
			// navigate("?page=1&limit=10")
			// navigate("hello")
			// let params = "hello there";
			// let params = "?page=1&limit=10";
			// setSearchParams(params);
		}
	}
	function renderNextPage() {
		if (pageNo < maxPageNumber) {
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
				{/* {from.price} */}
				{productsList.map((product) => (
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
