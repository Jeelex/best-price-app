import React from "react";

function ProductItem({ product }) {
	return (
		<div>
			<img src={product.image_url} alt={`${product.title} thumbnail`} />
			<h3>{product.title}</h3>
			<p>{product.price}</p>
		</div>
	);
}

export default ProductItem;
