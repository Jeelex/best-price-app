import React from "react";

function Item({ item }) {
	function test() {
		console.log("title clicked");
	}

	return (
		<div>
			<img src={item.image_url} alt={`${item.title} thumbnail`} />
			<a href="#" onClick={test}>
				{item.title}
			</a>
			<hr />
			<a href="#">{item.slug}</a>
			<hr />
		</div>
	);
}

export default Item;
