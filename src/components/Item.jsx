import React from "react";

function Item({ category: item }) {
	function test() {
		console.log("test");
	}

	return (
		<div>
			<img src={item.image_url} alt={`${item.title} thumbnail`} />
			<div>
				<a href="#" onClick={test}>
					{item.title}
				</a>
			</div>
			<a href="#">{item.slug}</a>
			<hr />
		</div>
	);
}

export default Item;
