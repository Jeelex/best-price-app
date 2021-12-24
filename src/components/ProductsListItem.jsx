import React from "react";
import { Link } from "react-router-dom";
import { addFloatingPoint } from "../utilityFunctions/utilityfunctions";


function ProductsListItem({ item }) {

	return (
		<>
			<Link to={`/products/${item.id}`} state={{ from: item.id }}>
				<img src={item.image_url} alt={`${item.title} thumbnail`} />
				<h2>{item.title}</h2>
				<p>&euro;{addFloatingPoint(item.price)}</p>
			</Link>
			<hr />
		</>
	);
}

export default ProductsListItem;
