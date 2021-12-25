import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function NavigationButtons({currentPageNo, prevBtnFunction, nextBtnFunction, maxPageNumber}) {
	return (
		<Flex justifyContent="space-between">
			<Button
				colorScheme="red"
				width="90px"
				style={{ opacity: currentPageNo >= 2 ? 1 : 0.5 }}
				onClick={prevBtnFunction}
			>
				previous
			</Button>
			<Button
				colorScheme="red"
				width="90px"
				style={{ opacity: currentPageNo < maxPageNumber ? 1 : 0.5 }}
				onClick={nextBtnFunction}
			>
				next
			</Button>
		</Flex>
	);
}

export default NavigationButtons;
