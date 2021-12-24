import React from "react";
import { Link } from "react-router-dom";
import { addFloatingPoint } from "../utilityFunctions/utilityfunctions";

function ProductsListItem({ item }) {
	function addDescription() {
		return { __html: item.description };
	}

	return (
		<>
			<Link to={`/products/${item.id}`} state={{ from: item.id }}>
				<img src={item.image_url} alt={`${item.title} thumbnail`} />
				<h2>{item.title}</h2>
				<p>{addFloatingPoint(item.price)}&euro;</p>
				<p
					style={{
						// wordBreak: "break-word",
						textOverflow: "ellipsis",
						overflow: "hidden",
						whiteSpace: "nowrap",
						// width: "200px",
						maxHeight: "3em",
					}}
					dangerouslySetInnerHTML={addDescription()}
				></p>
			</Link>
			<hr />
		</>
	);
}

export default ProductsListItem;
