import React, { useState, useEffect } from "react";
import ProductsListItem from "./ProductsListItem";
import { useSearchParams, useParams } from "react-router-dom";
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	Box,
	Button,
	VStack,
	Heading,
} from "@chakra-ui/react";
import NavigationButtons from "./NavigationButtons";
import { addFloatingPoint } from "../helperFunctions/helperFunctions";
import Navbar from "./Navbar";

function ProductsList() {
	// React Router hooks
	const [searchParams, setSearchParams] = useSearchParams();
	const { id } = useParams();
	
	// Fetched Product lists + currentPageNo
	const [wholeProductsList, setWholeProductsList] = useState([]);
	const [productsList, setProductsList] = useState([]);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	
	// Number of Products
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const maxProductsPerPage = 15;
	const maxPageNumber = Math.ceil(totalNumberOfProducts / maxProductsPerPage);
	
	// Prices
	const productsMinPrice = wholeProductsList.length > 0 && wholeProductsList[0].price;
	const productsMaxPrice =
		wholeProductsList.length > 0 && wholeProductsList[wholeProductsList.length - 1].price;
	const [originMinPrice, setOriginMinPrice] = useState(productsMinPrice);
	const [originMaxPrice, setOriginMaxPrice] = useState(productsMaxPrice);
	const [priceRange, setPriceRange] = useState([0, 2800]);
	const [userMinPrice, setUserMinPrice] = useState(0);
	const [userMaxPrice, setUserMaxPrice] = useState(28000);
	const [selectedPriceParams, setSelectedPriceParams] = useState("");
	const [hasUserSelectedPrice, setHasUserSelectedPrice] = useState(false);

	// Sorting by ascending or descending price
	const [selectedSortingParams, setSelectedSortingParams] = useState("&sort=price&order=asc");
	const [islowToHighPriceSorting, setIsLowToHighPriceSorting] = useState(true);

	// Button Logic - when to disable Next and/or Previous button
	const [isCurrentPageTheLastPage, setIsCurrentPageTheLastPage] = useState(false);
	const [isfirstItemInCurrentPage, setIsfirstItemInCurrentPage] = useState(false);
	const [isLastItemSameAsLastItemInWholeList, setIsLastItemSameAsLastItemInWholeList] =
		useState(false);

	const API = `https://bp-interview.herokuapp.com/categories/${id}/products`;
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
	useEffect(() => {
		setOriginMaxPrice(addFloatingPoint(productsMaxPrice));
		setOriginMinPrice(addFloatingPoint(productsMinPrice));
	}, [originMaxPrice, productsMaxPrice, productsMinPrice, wholeProductsList]);

	// data fetching based on user selected price range and/or currentPageNo
	useEffect(() => {
		fetch(selectedParamsAPI)
			.then((data) => data.json())
			.then(
				(data) => {
					setProductsList(data);
					setSearchParams(
						`page=${currentPageNo}&limit=15` + selectedPriceParams + selectedSortingParams
					);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [
		currentPageNo,
		searchParams,
		selectedParamsAPI,
		selectedPriceParams,
		selectedSortingParams,
		setSearchParams,
	]);

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
		} else {
			setIsCurrentPageTheLastPage(false);
		}
	}, [currentPageNo, isCurrentPageTheLastPage, maxPageNumber, productsList]);

	// checking if last item in currentPage is first OR last item in wholeProductsList
	useEffect(() => {
		const lastItemIdInCurrentPage =
			productsList.length > 0 && productsList[productsList.length - 1].id;
		const firstItemIdInWholeList = wholeProductsList.length > 0 && wholeProductsList[0].id;

		const lastItemIdInWholeList =
			wholeProductsList.length > 0 && wholeProductsList[wholeProductsList.length - 1].id;

		if (lastItemIdInCurrentPage === firstItemIdInWholeList) {
			setIsfirstItemInCurrentPage(true);
			// console.log("isfirstItemInCurrentPage", isfirstItemInCurrentPage);
		} else {
			setIsfirstItemInCurrentPage(false);
		}

		if (lastItemIdInCurrentPage === lastItemIdInWholeList) {
			setIsLastItemSameAsLastItemInWholeList(true);
			// console.log("isLastItemSameAsLastItemInWholeList", isLastItemSameAsLastItemInWholeList);
		} else {
			setIsLastItemSameAsLastItemInWholeList(false);
		}
	}, [
		isCurrentPageTheLastPage,
		isLastItemSameAsLastItemInWholeList,
		isfirstItemInCurrentPage,
		productsList,
		setIsfirstItemInCurrentPage,
		wholeProductsList,
	]);

	// TODO trying to disable prev and next buttons in certain cases
	// // useEffect(() => {
	// // 	if (lastItemIdInCurrentPage && isCurrentPageTheLastPage) {
	// // 		console.log("last item is here in last page");
	// // 		setIsNextBtnDisabled(true);
	// 		// setIsLastItemSameAsLastItemInWholeList(true);
	// 		// console.log("isLastItemSameAsLastItemInWholeList", isLastItemSameAsLastItemInWholeList);
	// //	}
	// 	// else {
	// 	// 	setIsNextBtnDisabled(false);
	// 	// }
	// // }, [isCurrentPageTheLastPage, lastItemIdInCurrentPage])

	// Previous Button onClick Funcion
	function renderPreviousPage() {
		if (currentPageNo === 1) {
			return;
		}
		
		setCurrentPageNo(currentPageNo - 1);
	}
	
	// Next Button onClick Funcion
	function renderNextPage() {
		if (isLastItemSameAsLastItemInWholeList && isCurrentPageTheLastPage) {
			return;
		}
		if (isCurrentPageTheLastPage) {
			return;
		}
		setCurrentPageNo(currentPageNo + 1);
	}

	// ???????????????????? (Sorting by) Button onClick Funcion
	function sortByPrice() {
		if (islowToHighPriceSorting && isCurrentPageTheLastPage) {
			setCurrentPageNo(1);
		}

		if (!islowToHighPriceSorting && currentPageNo === maxPageNumber) {
			setCurrentPageNo(1);
		}

		if (islowToHighPriceSorting) {
			setSelectedSortingParams("&sort=price&order=desc");
		} else {
			setSelectedSortingParams("&sort=price&order=asc");
		}
		setIsLowToHighPriceSorting(!islowToHighPriceSorting);
	}

	// Price Range Slider input Function
	function priceSelection(priceRange) {
		setHasUserSelectedPrice(true);
		setPriceRange(priceRange);
		setCurrentPageNo(1);
	}

	return (
		<>
			<Navbar />

			<VStack spacing={4} align="stretch">
				<Box>
					<Heading as="h3" fontSize="lg" fontWeight="600" margin="0.5em 0">
						?????????? ??????????:{" "}
						{hasUserSelectedPrice
							? `???${priceRange[0]} - ???${priceRange[1]}`
							: `???${originMinPrice} - ???${originMaxPrice}`}
					</Heading>
					<RangeSlider
						name="price range"
						aria-label="min/max price range sliders"
						colorScheme="red"
						min={0}
						max={originMaxPrice}
						defaultValue={[0, 500]}
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

				<Button onClick={sortByPrice} maxWidth={{ sm: "22ch" }}>{`????????????????????: ${
					islowToHighPriceSorting ? "????????????????" : "??????????????"
				} ????????`}</Button>

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
		</>
	);
}

export default ProductsList;
