import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Flex, VStack, Heading, Text, Link, Image } from "@chakra-ui/react";
import { addDescription, addFloatingPoint } from "../helperFunctions/helperFunctions";

function Product() {
	const [product, setProduct] = useState({});
	const location = useLocation();
	const { from } = location.state;

	// first data fetch
	useEffect(() => {
		const API = `http://bp-interview.herokuapp.com/products/${from}`;
		fetch(API)
			.then((response) => response.json())
			.then(
				(data) => {
					setProduct(data);
					console.log("product id", from);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [from]);

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
				<p>{addFloatingPoint(product && product.price)}€</p>
				<Text
					mt={2}
					fontSize="sm"
					// textOverflow="ellipsis"
					overflow="hidden"
					maxHeight="8rem"
					dangerouslySetInnerHTML={addDescription(product)}
				></Text>
			</VStack>
		</div>
	);
}

export default Product;
