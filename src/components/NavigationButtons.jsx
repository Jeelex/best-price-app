import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function NavigationButtons({currentPageNo, prevBtnFunction, nextBtnFunction, isCurrentPageTheLastPage}) {
	return (
		<Flex justifyContent="space-between">
			<Button
				colorScheme="red"
				width="90px"
				style={{ opacity: currentPageNo === 1 ? 0.5 : 1 }}
				onClick={prevBtnFunction}
			>
				previous
			</Button>
			<Button
				colorScheme="red"
				width="90px"
				style={{ opacity: isCurrentPageTheLastPage ? 0.5 : 1 }}
				onClick={nextBtnFunction}
			>
				next
			</Button>
		</Flex>
	);
}

export default NavigationButtons;
