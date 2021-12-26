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
	Button,
	VStack,
	Heading,
	Link,
} from "@chakra-ui/react";
import NavigationButtons from "./NavigationButtons";
import { addFloatingPoint } from "../helperFunctions/helperFunctions";

function ProductsList() {
	const location = useLocation();
	const { from } = location.state;
	const [wholeProductsList, setWholeProductsList] = useState([]);
	// console.log(wholeProductsList[wholeProductsList.length-1].price)
	const [productsList, setProductsList] = useState([]);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);
	const [priceRange, setPriceRange] = useState([0, 2800]);
	const [userMinPrice, setUserMinPrice] = useState(0);
	const [userMaxPrice, setUserMaxPrice] = useState(28000);
	const [selectedPriceParams, setSelectedPriceParams] = useState("");
	const [selectedSortingParams, setSelectedSortingParams] = useState("");
	const [isCurrentPageTheLastPage, setIsCurrentPageTheLastPage] = useState(false);
	const [isfirstItemInCurrentPage, setIsfirstItemInCurrentPage] = useState(false);
	const [isLastItemSameAsLastItemInWholeList, setIsLastItemSameAsLastItemInWholeList] =
		useState(false);
	const [islowToHighPriceSorting, setIsLowToHighPriceSorting] = useState(true);

	const API = `http://bp-interview.herokuapp.com/categories/${from}/products`;

	let selectedParamsAPI =
		API + `?page=${currentPageNo}&limit=15` + selectedPriceParams + selectedSortingParams;

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

	// setting max value of price range based on most expensive product in current category
	const productsMinPrice = wholeProductsList.length > 0 && wholeProductsList[0].price;
	const productsMaxPrice =
		wholeProductsList.length > 0 && wholeProductsList[wholeProductsList.length - 1].price;
	const [originMinPrice, setOriginMinPrice] = useState(productsMinPrice);
	const [originMaxPrice, setOriginMaxPrice] = useState(productsMaxPrice);
	const [hasUserSelectedPrice, setHasUserSelectedPrice] = useState(false);

	// const [originMaxPriceHalf, setOriginMaxPriceHalf] = useState(originMaxPrice / 2);
	// const maxPrice = addFloatingPoint(productsMaxPrice)
	// console.log("maxPrice", maxPrice / 2)
	// let maxPriceHalf = maxPrice / 2
	useEffect(() => {
		// maxPriceHalf = maxPrice / 2
		setOriginMaxPrice(addFloatingPoint(productsMaxPrice));
		setOriginMinPrice(addFloatingPoint(productsMinPrice));
		// setOriginMaxPriceHalf(productsMaxPrice / 2)
		// setOriginMaxPriceHalf(addFloatingPoint(productsMaxPrice / 2))
	}, [originMaxPrice, productsMaxPrice, wholeProductsList]);

	// data fetching based on price range and/or currentPageNo
	useEffect(() => {
		fetch(selectedParamsAPI)
			.then((data) => data.json())
			.then(
				(data) => {
					setProductsList(data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [currentPageNo, priceRange, selectedParamsAPI]);

	// updating price range based on user selection
	useEffect(() => {
		// multiplying by 100 because prices are in cents
		setUserMinPrice(priceRange[0] * 100);
		setUserMaxPrice(priceRange[1] * 100);
		setSelectedPriceParams(`&min_price=${userMinPrice}&max_price=${userMaxPrice}`);
	}, [priceRange, userMaxPrice, userMinPrice]);

	//checking if current page is the last page
	useEffect(() => {
		if (productsList.length < 15 || currentPageNo === maxPageNumber) {
			setIsCurrentPageTheLastPage(true);
			console.log("isCurrentPageTheLastPage", isCurrentPageTheLastPage);
		} else {
			setIsCurrentPageTheLastPage(false);
		}
	}, [currentPageNo, isCurrentPageTheLastPage, maxPageNumber, productsList]);

	// checking if last item in currentPage is first OR last item in wholeProductsList
	useEffect(() => {
		const firstItemIdInWholeList = wholeProductsList.length > 0 && wholeProductsList[0].id;

		const lastItemIdInCurrentPage =
			productsList.length > 0 && productsList[productsList.length - 1].id;
		const lastItemIdInWholeList =
			wholeProductsList.length > 0 && wholeProductsList[wholeProductsList.length - 1].id;

		if (lastItemIdInCurrentPage === firstItemIdInWholeList) {
			setIsfirstItemInCurrentPage(true);
			console.log("isfirstItemInCurrentPage", isfirstItemInCurrentPage);
		} else {
			setIsfirstItemInCurrentPage(false);
		}

		if (lastItemIdInCurrentPage === lastItemIdInWholeList) {
			setIsLastItemSameAsLastItemInWholeList(true);
			console.log("isLastItemSameAsLastItemInWholeList", isLastItemSameAsLastItemInWholeList);
		} else {
			setIsLastItemSameAsLastItemInWholeList(false);
		}
	}, [
		isLastItemSameAsLastItemInWholeList,
		isfirstItemInCurrentPage,
		productsList,
		setIsfirstItemInCurrentPage,
		wholeProductsList,
	]);

	function renderPreviousPage() {
		if (currentPageNo === 1) {
			console.log("it's the first page");
			return;
		}

		setCurrentPageNo(currentPageNo - 1);
		console.log("pageNo", currentPageNo);
	}

	function renderNextPage() {
		if (isLastItemSameAsLastItemInWholeList && isCurrentPageTheLastPage) {
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
			setSelectedSortingParams("&sort=price&order=desc");
		} else {
			setSelectedSortingParams("");
		}
		setIsLowToHighPriceSorting(!islowToHighPriceSorting);
	}

	function priceSelection(priceRange) {
		setHasUserSelectedPrice(true);
		setPriceRange(priceRange);
		setCurrentPageNo(1);
	}

	return (
		<VStack spacing={4} align="stretch">
			<nav>
				<Link as={RouterLink} to="/">
					Home
				</Link>
			</nav>

			<Box>
				<Heading as="h3" fontSize="lg" fontWeight="600" margin="0.5em 0">
					Εύρος Τιμών: {hasUserSelectedPrice ? `€${priceRange[0]} - €${priceRange[1]}` : `€${originMinPrice} - €${originMaxPrice}`}
				</Heading>
				<RangeSlider
					name="price range"
					aria-label={["min", "max"]}
					colorScheme="red"
					min={0}
					max={originMaxPrice}
					defaultValue={[0, 500]}
					// defaultValue={[0, originMaxPriceHalf]}
					// defaultValue={[0, maxPriceHalf]}
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
				isCurrentPageTheLastPage={isCurrentPageTheLastPage}
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
				isCurrentPageTheLastPage={isCurrentPageTheLastPage}
			/>
		</VStack>
	);
}

export default ProductsList;
