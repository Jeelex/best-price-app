import React from "react";
import { Link } from "react-router-dom";

function Item({ item }) {
	return (
		<div>
			<Link to={`/categories/${item.id}/`} state={{ from: item.id }}>
				<img src={item.image_url} alt={`${item.title} thumbnail`} />
				<h3>{item.title}</h3>
			</Link>
			<hr />
		</div>
	);
}

export default Item;
