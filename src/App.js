import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import ProductsList from "./components/ProductsList";
import Product from "./components/Product";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="categories/:id" element={<ProductsList />} />
			<Route path="products/:id" element={<Product />} />
		</Routes>
	);
}

export default App;
