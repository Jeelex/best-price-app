import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
	Box,
	Button,
	Flex,
	VStack,
	Heading,
	Text,
	Link,
	Image,
} from "@chakra-ui/react";

function Product() {
	const [product, setProduct] = useState({});
	const location = useLocation();
	const { from } = location.state;

	async function getProduct() {
		console.log("product id", from);
		const API = `http://bp-interview.herokuapp.com/products/${from}`;

		try {
			const response = await fetch(API);
			const data = await response.json();
			// console.log(data);
			setProduct(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getProduct();
		// setProductsList(getProductsList);
	}, []);

	return (
		<div>
			<nav>
				<Link as={RouterLink} to="/">
					Home
				</Link>
			</nav>
			<VStack spacing={4} align="stretch">
				<Flex justifyContent="center" alignItems="center">
					<Image
						// width="auto"
						height="55vh"
						objectFit="contain"
						src={product.image_url}
						alt={`${product.title} thumbnail`}
					/>
				</Flex>
				<Heading as="h2" size="sm" fontWeight="bold">
					{product.title}
				</Heading>
				<h3>{product.title}</h3>
				<p>{product.price}</p>
			</VStack>
		</div>
	);
}

export default Product;
