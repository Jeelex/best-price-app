import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./components/Home";
import ProductsList from "./components/ProductsList";
import Product from "./components/Product";

function App() {
	return (
		<ChakraProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="categories/:id" element={<ProductsList />} />
				{/* <Route path="categories/:id/:page" element={<ProductsList />} /> */}
				{/* <Route path="categories/:id?page=1&limit=10" element={<ProductsList />} /> */}
				<Route path="products/:id" element={<Product />} />
			</Routes>
		</ChakraProvider>
	);
}

export default App;
