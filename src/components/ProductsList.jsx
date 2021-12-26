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
	const [wholeProductsList, setWholeProductsList] = useState([]);
	const [productsList, setProductsList] = useState([]);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);
	const [priceRange, setPriceRange] = useState([0, 2800]);

	// const [userPriceRange, setUserPriceRange] = useState([0, 2800]);
	// const [originalData, setOriginalData] = useState([]);
	const [userMinPrice, setUserMinPrice] = useState(0);
	const [userMaxPrice, setUserMaxPrice] = useState(28000);
	const [priceFilters, setPriceFilters] = useState("");
	const [selectedPriceParams, setSelectedPriceParams] = useState("");
	const [selectedSortingParams, setSelectedSortingParams] = useState("");
	const [isCurrentPageTheLastPage, setIsCurrentPageTheLastPage] =
		useState(false);

	const [
		isLastItemSameAsLastItemInWholeList,
		setIsLastItemSameAsLastItemInWholeList,
	] = useState(false);

	const [islowToHighPriceSorting, setIsLowToHighPriceSorting] = useState(true);

	const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;

	// let specificPageAPI = API + `?page=${currentPageNo}&limit=${maxProductsPerPage}`;
	// let specificPageAPI = API + `?page=${currentPageNo}&limit=3`;

	// let selectedPriceParams = `&min_price=${userMinPrice}&max_price=${userMaxPrice}&limit=3`;

	let specificPageAPI =
		API +
		`?page=${currentPageNo}&limit=15` +
		selectedPriceParams +
		selectedSortingParams;

	// let selectedPriceAPI = API + priceFilters;
	// let selectedPriceAPI = API + `?min_price=${userMinPrice}&max_price=${userMaxPrice}&limit=${maxProductsPerPage}`;

	// let selectedPriceAPI = API + `?min_price=${userMinPrice}&max_price=${userMaxPrice}&limit=3`;

	// first data fetch
	useEffect(() => {
		fetch(API)
			.then((firstResponse) => firstResponse.json())
			.then(
				(allData) => {
					setWholeProductsList(allData);
					setTotalNumberOfProducts(allData.length);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [API]);

	// data fetching based on price range and/or currentPageNo
	useEffect(() => {
		fetch(specificPageAPI)
			.then((data) => data.json())
			.then(
				(data) => {
					setProductsList(data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [currentPageNo, priceRange, specificPageAPI]);

	// updating price range based on user selection
	useEffect(() => {
		// multiplying by 100 because prices are in cents
		setUserMinPrice(priceRange[0] * 100);
		setUserMaxPrice(priceRange[1] * 100);
		setSelectedPriceParams(
			`&min_price=${userMinPrice}&max_price=${userMaxPrice}`
		);
		// getProductsList(selectedPriceAPI);
		// getProductsList(specificPageAPI);
	}, [priceRange, userMaxPrice, userMinPrice]);

	//checking if current page is the last page
	useEffect(() => {
		if (productsList.length < 15 || currentPageNo === maxPageNumber) {
			// console.log("less than 15!");
			// console.log(productsList);
			// setAreAllProductsDisplayed(!areAllProductsDisplayed);
			setIsCurrentPageTheLastPage(true);
			console.log("isCurrentPageTheLastPage", isCurrentPageTheLastPage);
		} else {
			setIsCurrentPageTheLastPage(false);
		}
	}, [currentPageNo, isCurrentPageTheLastPage, maxPageNumber, productsList]);

	// checking if last item in currentPage is last item in wholeProductsList
	useEffect(() => {
		const lastItemIdInCurrentPage =
			productsList.length > 0 && productsList[productsList.length - 1].id;
		const lastItemIdInWholeList =
			wholeProductsList.length > 0 &&
			wholeProductsList[wholeProductsList.length - 1].id;

		if (lastItemIdInCurrentPage === lastItemIdInWholeList) {
			setIsLastItemSameAsLastItemInWholeList(true);
			console.log(
				"isLastItemSameAsLastItemInWholeList",
				isLastItemSameAsLastItemInWholeList
			);
		} else {
			setIsLastItemSameAsLastItemInWholeList(false);
		}
	}, [isLastItemSameAsLastItemInWholeList, productsList, wholeProductsList]);

	// useEffect(() => {
	// 	getProductsList(specificPageAPI);
	// 	console.log("specificPageAPI", specificPageAPI);
	// }, [selectedPriceParams])

	// console.log("userMinPrice", userMinPrice);
	// console.log("userMaxPrice", userMaxPrice);
	// console.log("selectedPriceAPI", selectedPriceAPI);
	// console.log("specificPageAPI", specificPageAPI);
	// console.log("priceFilters", priceFilters);

	function renderPreviousPage() {
		if (isCurrentPageTheLastPage || currentPageNo === 1) {
			console.log("previous btn should be disabled");
			// return;
		}

		if (currentPageNo >= 2) {
			setCurrentPageNo(currentPageNo - 1);
		}
		console.log("pageNo", currentPageNo);
	}

	function renderNextPage() {
		if (isLastItemSameAsLastItemInWholeList && isCurrentPageTheLastPage) {
			// console.log("next btn should be disabled");
			return;
		}
		if (isCurrentPageTheLastPage) {
			// console.log("next btn should be disabled");
			return;
		}
		setCurrentPageNo(currentPageNo + 1);

		console.log("pageNo", currentPageNo);
	}

	function sortByPrice() {
		if (islowToHighPriceSorting) {
			// setCurrentPageNo(1);
			setSelectedSortingParams("&sort=price&order=desc");
		} else {
			setCurrentPageNo(maxPageNumber);
			setSelectedSortingParams("");
		}
		setIsLowToHighPriceSorting(!islowToHighPriceSorting);

		setSelectedSortingParams("&sort=price&order=desc");
	}
	// console.log("islowToHigh", islowToHigh)
	console.log("specificPageAPI", specificPageAPI);

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
				islowToHighPriceSorting ? "Low" : "High"
			} Price`}</Button>

			<NavigationButtons
				currentPageNo={currentPageNo}
				prevBtnFunction={renderPreviousPage}
				nextBtnFunction={renderNextPage}
				maxPageNumber={maxPageNumber}
			/>
			<div>
				{productsList.map((product) => (
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
