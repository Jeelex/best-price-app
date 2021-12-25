import React from "react";
import {
	chakra,
	Box,
	Image,
	Flex,
	HStack,
	useColorModeValue,
	Heading,
	Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { addFloatingPoint } from "../helperFunctions/helperFunctions";

function ProductsListItem({ item }) {
	function addDescription() {
		return { __html: item.description };
	}

	return (
		<>
			<Link to={`/products/${item.id}`} state={{ from: item.id }}>
				<Flex w="full" alignItems="center" justifyContent="center">
					<Flex w="100%" mx="auto" shadow="lg" rounded="lg" overflow="hidden">
						<Flex w={1 / 3} align="center" justify="center">
							<Image
								width="150px"
								height="100px"
								objectFit="contain"
								src={item.image_url}
								alt={`${item.title} thumbnail`}
							/>
						</Flex>

						<Box w={2 / 3} p={{ base: 4, md: 4 }}>
							<Heading as="h2" size="sm" fontWeight="bold">
								{item.title}
							</Heading>

							<Text
								mt={2}
								fontSize="sm"
								wordBreak="break-word"
								textOverflow="ellipsis"
								overflow="hidden"
								maxHeight="3em"
								dangerouslySetInnerHTML={addDescription()}
							></Text>

							<HStack spacing={1} display="flex" alignItems="center" mt={2}>
								<StarIcon color={useColorModeValue("gray.700", "gray.300")} />
								<StarIcon color={useColorModeValue("gray.700", "gray.300")} />
								<StarIcon color={useColorModeValue("gray.700", "gray.300")} />
								<StarIcon color="gray.500" />
								<StarIcon color="gray.500" />
							</HStack>

							<Flex mt={3} alignItems="center" justifyContent="space-between">
								<Text fontWeight="bold" fontSize="md">
									{addFloatingPoint(item.price)}&euro;
								</Text>
								<chakra.button
									px={2}
									py={1}
									bg="white"
									fontSize="xs"
									color="gray.900"
									fontWeight="bold"
									rounded="lg"
									textTransform="uppercase"
									_hover={{
										bg: "gray.200",
									}}
									_focus={{
										bg: "gray.400",
									}}
								>
									Add to cart
								</chakra.button>
							</Flex>
						</Box>
					</Flex>
				</Flex>
			</Link>
		</>
	);
}

export default ProductsListItem;
