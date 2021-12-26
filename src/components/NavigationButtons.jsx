import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function NavigationButtons({prevBtnDisabled, nextBtnDisabled, currentPageNo, prevBtnFunction, nextBtnFunction, maxPageNumber}) {
	return (
		<Flex justifyContent="space-between">
			<Button
				colorScheme="red"
				width="90px"
				// style={{ opacity: currentPageNo >= 2 ? 1 : 0.5 }}
				style={{ opacity: prevBtnDisabled ? 0.5 : 1 }}
				onClick={prevBtnFunction}
			>
				previous
			</Button>
			<Button
				colorScheme="red"
				width="90px"
				style={{ opacity: currentPageNo < maxPageNumber ? 1 : 0.5 }}
				// style={{ opacity: nextBtnDisabled ? 0.5 : 1 }}
				onClick={nextBtnFunction}
			>
				next
			</Button>
		</Flex>
	);
}

export default NavigationButtons;
