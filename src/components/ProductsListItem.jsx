import React from "react";
import { Link } from "react-router-dom";

function ProductsListItem({ item }) {
	return (
		<>
			<Link to={`/products/${item.id}`} state={{ from: item.id }}>
				<img src={item.image_url} alt={`${item.title} thumbnail`} />
				<h2>{item.title}</h2>
				<p>{item.price}</p>
			</Link>
			<hr />
		</>
	);
}

export default ProductsListItem;
