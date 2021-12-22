import React from "react";
import { Link } from "react-router-dom";

function Item({ item }) {
	return (
		<div>
			<img src={item.image_url} alt={`${item.title} thumbnail`} />
			<div>
				<Link to={`/categories/${item.id}/`}>
					{/* <a href="ttp://bp-interview.herokuapp.com/categories/583/" onClick={test}> */}
					{item.title}
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default Item;
