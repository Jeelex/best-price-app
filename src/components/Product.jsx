import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flex, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { addDescription, addFloatingPoint } from "../helperFunctions/helperFunctions";
import Navbar from "./Navbar";

function Product() {
	const [product, setProduct] = useState({});
	
	// React Router hooks
	const location = useLocation();
	const { from } = location.state;

	// first data fetch
	useEffect(() => {
		const API = `https://bp-interview.herokuapp.com/products/${from}`;
		fetch(API)
			.then((response) => response.json())
			.then(
				(data) => {
					setProduct(data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [from]);

	return (
		<>
			<Navbar />
			<VStack spacing={4} align="stretch">
				<Flex justifyContent="center" alignItems="center">
					<Image
						height="55vh"
						objectFit="contain"
						src={product.image_url}
						alt={`${product.title} thumbnail`}
					/>
				</Flex>
				<Heading as="h2" size="sm" fontWeight="bold">
					{product.title}
				</Heading>
				<p>{addFloatingPoint(product.price)}€</p>
				<Text
					// TODO add ellipsis in product description
					// textOverflow="ellipsis"
					mt={2}
					fontSize="sm"
					overflow="hidden"
					maxHeight="8rem"
					dangerouslySetInnerHTML={addDescription(product)}
				></Text>
			</VStack>
		</>
	);
}

export default Product;
