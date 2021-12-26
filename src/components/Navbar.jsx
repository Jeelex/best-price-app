import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Link } from "@chakra-ui/react";

import BestPriceLogo from "./Logo/BestPriceLogo";

function Navbar() {
	return (
		<Flex as="nav" justifyContent="space-between" alignItems="center" marginBottom="3em">
			<BestPriceLogo />
			<Flex gridGap="1em" justifyContent="center" alignItems="center">
				<Link as={RouterLink} to="/">
					Home
				</Link>
				<Link to="/">Σύνδεση</Link>
				<Link to="/">Εγγραφή</Link>
			</Flex>
		</Flex>
	);
}

export default Navbar;
