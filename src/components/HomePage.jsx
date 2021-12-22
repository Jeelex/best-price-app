import React, { useState, useEffect } from "react";
// import {
// 	getCategories,
// 	getProductsList,
// } from "../utilityFunctions/utilityfunctions";
import Item from "./Item";

function HomePage() {
	const [categories, setCategories] = useState([]);

	async function getCategories() {
		const API = "http://bp-interview.herokuapp.com/categories";

		try {
			const response = await fetch(API);
			const data = await response.json();
			console.log(data);
			setCategories(data);
			// return data;
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

	// console.log(getCategories());
	// setCategories(data);

	useEffect(() => {
		getCategories();
		// return () => {
		//   cleanup
		// }
	}, []);

	return (
		<div>
			<h2>Home</h2>

			{categories.map((category) => (
				<Item key={category.id} item={category} />
			))}
		</div>
	);
}

export default HomePage;
