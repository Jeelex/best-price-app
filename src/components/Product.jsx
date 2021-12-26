import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Button, Flex, VStack, Heading, Text, Link, Image } from "@chakra-ui/react";

function Product() {
	const [product, setProduct] = useState({});
	const location = useLocation();
	const { from } = location.state;

	const API = `http://bp-interview.herokuapp.com/products/${from}`;

	// first data fetch
	useEffect(() => {
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
	}, [API, from]);

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
				<p>{product.price}</p>
			</VStack>
		</div>
	);
}

export default Product;
