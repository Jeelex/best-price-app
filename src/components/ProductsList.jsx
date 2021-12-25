import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import ProductsListItem from "./ProductsListItem";
import { useLocation } from "react-router-dom";
// import PriceRangeSlider from "./PriceRangeSlider";
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	Box,
	Container,
	Button,
	Flex,
	VStack,
	Heading,
	Text,
	Link,
} from "@chakra-ui/react";
import { addFloatingPoint } from "../helperFunctions/helperFunctions";
import NavigationButtons from "./NavigationButtons";

function ProductsList() {
	const location = useLocation();
	const { from } = location.state;
	const [productsList, setProductsList] = useState([]);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);
	const [priceRange, setPriceRange] = useState([0, 2800]);

	// const [userPriceRange, setUserPriceRange] = useState([0, 2800]);
	// const [originalData, setOriginalData] = useState([]);
	const [userMinPrice, setUserMinPrice] = useState(null);
	const [userMaxPrice, setUserMaxPrice] = useState(null);
	const [priceFilters, setPriceFilters] = useState("");
	const [selectedPriceParams, setSelectedPriceParams] = useState("");

	const [islowToHigh, setIsLowToHigh] = useState(false);

	const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;

	// let specificPageAPI = API + `?page=${currentPageNo}&limit=${maxProductsPerPage}`;
	// let specificPageAPI = API + `?page=${currentPageNo}&limit=3`;
	
	// let selectedPriceParams = `&min_price=${userMinPrice}&max_price=${userMaxPrice}&limit=3`;

	let specificPageAPI = API + `?page=${currentPageNo}&limit=3` + selectedPriceParams;

	// let selectedPriceAPI = API + priceFilters;
	// let selectedPriceAPI = API + `?min_price=${userMinPrice}&max_price=${userMaxPrice}&limit=${maxProductsPerPage}`;
	
	// let selectedPriceAPI = API + `?min_price=${userMinPrice}&max_price=${userMaxPrice}&limit=3`;
	// first data fetch + fetching based on current page
	useEffect(() => {
		getProductsList(specificPageAPI);
	}, []);

	useEffect(() => {
		getProductsList(specificPageAPI);
	}, [currentPageNo]);

	// fetching based on user selected price range
	// useEffect(() => {
	// 	getProductsList(selectedPriceAPI);
	// }, [priceRange]);

	useEffect(() => {
		// multiplying by 100 because prices are in cents
		setUserMinPrice(priceRange[0] * 100);
		setUserMaxPrice(priceRange[1] * 100);
		setSelectedPriceParams(`&min_price=${userMinPrice}&max_price=${userMaxPrice}`);
		// getProductsList(selectedPriceAPI);
		getProductsList(specificPageAPI);
	}, [priceRange]);
	console.log("userMinPrice", userMinPrice)
	console.log("userMaxPrice", userMaxPrice)
	// console.log("selectedPriceAPI", selectedPriceAPI);
	console.log("specificPageAPI", specificPageAPI)
	// console.log("priceFilters", priceFilters);
	

	async function getProductsList(ApiFilter) {
		// how to add pagination later:
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=1&limit=2`;
		// const API = `http://bp-interview.herokuapp.com/categories/${from}/products?page=${pageNo}&limit=2`;

		try {
			const firstResponse = await fetch(API);
			const allData = await firstResponse.json();
			setTotalNumberOfProducts(allData.length);
			// setOriginalData(allData);
			// console.log(allData)
			// const productsMinPrice = allData[0].price;
			// const productsMaxPrice = allData[allData.length - 1].price;
			// console.log("productsMinPrice", productsMinPrice)
			// console.log("productsMaxPrice", productsMaxPrice)
			// setUserPriceRange(productsMaxPrice);

			const response = await fetch(ApiFilter);
			const data = await response.json();
			console.log(data);
			setProductsList(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
		// console.log("data initial", originalData);
	}
	// console.log("priceRange", priceRange);

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

	return (
		<VStack spacing={4} align="stretch">
			<nav>
				<Link as={RouterLink} to="/">
					Home
				</Link>
			</nav>

			<Box>
				<Heading as="h3" fontSize="lg" fontWeight="600">
					Εύρος Τιμών: {`€${priceRange[0]} - €${priceRange[1]}`}
					Εύρος Τιμών: {`€${userMinPrice} - €${userMaxPrice}`}
				</Heading>
				<RangeSlider
					name="price range"
					aria-label={["min", "max"]}
					colorScheme="red"
					min={0}
					max={2800}
					defaultValue={[0, 1000]}
					minStepsBetweenThumbs={10}
					onChangeEnd={priceSelection}
				>
					<RangeSliderTrack>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>
					<RangeSliderThumb index={0} />
					<RangeSliderThumb index={1} />
				</RangeSlider>
			</Box>

			<Button onClick={sortByPrice}>{`Sorting by ${
				islowToHigh ? "High" : "Low"
			} Price`}</Button>

			<NavigationButtons
				currentPageNo={currentPageNo}
				prevBtnFunction={renderPreviousPage}
				nextBtnFunction={renderNextPage}
				maxPageNumber={maxPageNumber}
			/>
			<div>
				{productsList
					.sort((a, b) => (islowToHigh ? b.price - a.price : a.price - b.price))
					// .filter(
					// 	(product) =>
					// 		priceRange[0] <= addFloatingPoint(product.price) &&
					// 		addFloatingPoint(product.price) <= priceRange[1]
					// )
					.map((product) => (
						<ProductsListItem key={product.id} item={product} />
					))}
			</div>
			<NavigationButtons
				currentPageNo={currentPageNo}
				prevBtnFunction={renderPreviousPage}
				nextBtnFunction={renderNextPage}
				maxPageNumber={maxPageNumber}
			/>
		</VStack>
	);
}

export default ProductsList;
