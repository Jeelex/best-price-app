import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Item from "./Item";
import { Box, Image, Flex, VStack, Heading } from "@chakra-ui/react";

function Home() {
	const [categories, setCategories] = useState([]);

	async function getCategories() {
		const API = "http://bp-interview.herokuapp.com/categories";

		try {
			const response = await fetch(API);
			const data = await response.json();
			// console.log(data);
			setCategories(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	useEffect(() => {
		getCategories();
		// return () => {
		//   cleanup
		// }
	}, []);

	return (
		<div>
			<Heading as="h1" fontSize="xl">
				Home
			</Heading>
			<VStack spacing={8} align="stretch">
				{categories.map((category) => (
					<div key={category.id}>
						<Link
							to={`/categories/${category.id}`}
							state={{ from: category.id }}
						>
							{/* <img src={category.image_url} alt={`${category.title} thumbnail`} /> */}
							{/* <h3>{category.title}</h3> */}

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
		</div>
	);
}

export default Home;
