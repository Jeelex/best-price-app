import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import HomePage from "./components/HomePage";
import ProductsList from "./components/ProductsList";
import Product from "./components/Product";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/categories/583" element={<ProductsList />} />
			<Route path="/" element={<Product />} />
		</Routes>
		// <div>
		// 	<HomePage />
		// 	{/* <ProductsList /> */}
		// 	{/* <Product /> */}
		// </div>
	);
}

export default App;
