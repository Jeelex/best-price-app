import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListItem from "./ProductsListItem";
import { useLocation } from "react-router-dom";
// import PriceRangeSlider from "./PriceRangeSlider";
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	Box,
} from "@chakra-ui/react";

function ProductsList() {
	const location = useLocation();
	const { from } = location.state;
	const [productsList, setProductsList] = useState([]);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);
	const [priceRange, setPriceRange] = useState([0, 10000]);

	const [originalData, setOriginalData] = useState([]);
	const [islowToHigh, setIsLowToHigh] = useState(false);

	const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;
	let specificPageAPI =
		API + `?page=${currentPageNo}&limit=${maxProductsPerPage}`;

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
		// console.log("data initial", originalData);
	}

	useEffect(() => {
		getProductsList();
	}, [currentPageNo]);

	function renderPreviousPage() {
		if (currentPageNo >= 2) {
			setCurrentPageNo(currentPageNo - 1);
		}
		console.log("pageNo", currentPageNo);
	}
	function renderNextPage() {
		if (currentPageNo < maxPageNumber) {
			setCurrentPageNo(currentPageNo + 1);
		}
		console.log("pageNo", currentPageNo);
	}

	function sortByPrice() {
		if (islowToHigh) {
			setCurrentPageNo(1);
		} else {
			setCurrentPageNo(maxPageNumber);
		}
		setIsLowToHigh(!islowToHigh);
	}
	// console.log("islowToHigh", islowToHigh)
	// console.log("originalData prices", originalData);
	// originalData.forEach(product => console.log(product.price, product.price.toString().))
	originalData.forEach((product) => {
		const priceOriginal = product.price.toString();
		const array = priceOriginal.split("");
		array.splice(2, 0, ".");
		const arrayToString = array.join("");
		const priceWithPeriod = parseFloat(arrayToString);
		console.log(priceWithPeriod);
	});

	function priceSelection(priceRange) {
		setPriceRange(priceRange);
		console.log("priceRange AFTER", priceRange);
	}
	console.log("priceRange INITIAL", priceRange);

	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<h2>A listing page, which will have a list of products.</h2>
			<div>
				{/* <div>
					<label htmlFor="price-range">Price Range</label>
					<input
						type="range"
						name="price-range"
						id="price-range"
						min="0"
						max="5000"
					/>
				</div> */}
				{/* <PriceRangeSlider 
				/> */}
				<Box padding="1em" width="90%">
					<RangeSlider
						name="price range"
						aria-label={["min", "max"]}
						colorScheme="pink"
						min={0}
						// max={priceRange[1]}
						max={8000}
						defaultValue={[10, 100]}
						// step={1000}
						minStepsBetweenThumbs={5}
						onChangeEnd={priceSelection}
					>
						<RangeSliderTrack>
							<RangeSliderFilledTrack />
						</RangeSliderTrack>
						<RangeSliderThumb index={0} />
						<RangeSliderThumb index={1} />
					</RangeSlider>
				</Box>

				<Box>{`${priceRange[0]} - ${priceRange[1]}`}</Box>

				<button onClick={sortByPrice}>{`Sort by ${
					islowToHigh ? "Low" : "High"
				} Price`}</button>
			</div>

			<button
				style={{ opacity: currentPageNo >= 2 ? 1 : 0.5 }}
				onClick={renderPreviousPage}
			>
				previous
			</button>
			<button
				style={{ opacity: currentPageNo < maxPageNumber ? 1 : 0.5 }}
				onClick={renderNextPage}
			>
				next
			</button>
			<div>
				{productsList
					.sort((a, b) => (islowToHigh ? b.price - a.price : a.price - b.price))
					.filter(
						(product) =>
							priceRange[0] <= product.price && product.price <= priceRange[1]
					)
					.map((product) => (
						<ProductsListItem key={product.id} item={product} />
					))}
			</div>
			<button
				style={{ opacity: currentPageNo >= 2 ? 1 : 0.5 }}
				onClick={renderPreviousPage}
			>
				previous
			</button>
			<button
				style={{ opacity: currentPageNo < maxPageNumber ? 1 : 0.5 }}
				onClick={renderNextPage}
			>
				next
			</button>
		</div>
	);
}

export default ProductsList;
