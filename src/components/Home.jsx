import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Image, Flex, VStack, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Home() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const API = "http://bp-interview.herokuapp.com/categories";
		fetch(API)
			.then((response) => response.json())
			.then(
				(data) => {
					setCategories(data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

	return (
		<>
			<Navbar />
			
			<VStack spacing={8} align="stretch">
				{categories.map((category) => (
					<div key={category.id}>
						<Link to={`/categories/${category.id}`} state={{ from: category.id }}>
							<Flex
								w="100%"
								mx="auto"
								shadow="lg"
								rounded="lg"
								overflow="hidden"
								justifyContent="center"
								// alignItems="center"
							>
								<Box w={2 / 3} p={{ base: 4, md: 4 }}>
									<Heading as="h2" size="sm" fontWeight="bold">
										{category.title}
									</Heading>
								</Box>
								<Flex w={1 / 3} alignItems="center" justifyContent="center">
									<Image
										width="150px"
										height="100px"
										objectFit="contain"
										src={category.image_url}
										alt={`${category.title} thumbnail`}
									/>
								</Flex>
							</Flex>
						</Link>
					</div>
				))}
			</VStack>
		</>
	);
}

export default Home;
