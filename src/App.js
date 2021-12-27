import { Routes, Route } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import Home from "./components/Home";
import ProductsList from "./components/ProductsList";
import Product from "./components/Product";

function App() {
	return (
		<ChakraProvider>
			<Container maxW="container.lg">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/categories/:id/:slug" element={<ProductsList />} />
					<Route path="/products/:id/:slug" element={<Product />} />
				</Routes>
			</Container>
		</ChakraProvider>
	);
}

export default App;
