import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	chakra,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	CloseButton,
	Box,
	VStack,
	Button,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
// import { FaMoon, FaSun, FaHeart } from "react-icons/fa";
// import { AiFillGithub, AiOutlineMenu, AiFillHome, AiOutlineInbox } from "react-icons/ai";
// import { BsFillCameraVideoFill } from "react-icons/bs";
// import { Logo } from "@choc-ui/logo";
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
