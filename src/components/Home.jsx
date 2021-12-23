import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Item from "./Item";

function Home() {
	const [categories, setCategories] = useState([]);

	async function getCategories() {
		const API = "http://bp-interview.herokuapp.com/categories";

		try {
			const response = await fetch(API);
			const data = await response.json();
			// console.log(data);
			setCategories(data);
		} catch (error) {
			console.log(error);
			// setErrorMessage("Something went wrong. Please try again!");
		}
	}

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
				<div key={category.id}>
					<Link to={`/categories/${category.id}`} state={{ from: category.id }}>
						<img src={category.image_url} alt={`${category.title} thumbnail`} />
						<h3>{category.title}</h3>
					</Link>
					<hr />
				</div>
			))}
		</div>
	);
}

export default Home;
