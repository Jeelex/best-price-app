import React from "react";

function ProductsListItem({ item }) {
	function test() {
		console.log("title clicked");
	}

	return (
		<>
			<img src={item.image_url} alt={`${item.title} thumbnail`} />
			<div>
				<a href="#" onClick={test}>
					{item.title}
				</a>
				<p>{item.price}</p>
			</div>
			<hr />
		</>
	);
}

export default ProductsListItem;
