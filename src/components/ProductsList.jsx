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
import { addFloatingPoint } from "../utilityFunctions/utilityfunctions";

function ProductsList() {
	const location = useLocation();
	const { from } = location.state;
	const [productsList, setProductsList] = useState([]);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);
	const [originalPriceRange, setOriginalPriceRange] = useState([0, 10000]);
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
			// console.log(originalData[0])
			const productsMinPrice = originalData[0].price;
			const productsMaxPrice = originalData[originalData.length-1].price;
			
			
			console.log("productsMinPrice", productsMinPrice);
			console.log("productsMaxPrice", productsMaxPrice);
			setOriginalPriceRange(addFloatingPoint(productsMinPrice), addFloatingPoint(productsMaxPrice))
			setPriceRange(addFloatingPoint(productsMinPrice), addFloatingPoint(productsMaxPrice))
			// setPriceRange(originalData[0].price, originalData[originalData.length-1].price)

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

	function priceSelection(priceRange) {
		setPriceRange(priceRange);
	}
	// console.log("originalPriceRange INITIAL", originalPriceRange);
	// console.log("priceRange INITIAL", priceRange);

	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<h2>A listing page, which will have a list of products.</h2>
			<div>
				<Box padding="1em" width="90%">
					<RangeSlider
						name="price range"
						aria-label={["min", "max"]}
						colorScheme="pink"
						min={originalPriceRange[0]}
						max={originalPriceRange[1]}
						// defaultValue={[10, 80]}
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

				<Box>Price Range: {`€${priceRange[0]} - €${priceRange[1]}`}</Box>

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
							priceRange[0] <= addFloatingPoint(product.price) &&
							addFloatingPoint(product.price) <= priceRange[1]
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
