import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { addFloatingPoint } from "../utilityFunctions/utilityfunctions";

function ProductsListItem({ item }) {
	// let description = useRef();

	// description.current = "hello"
	// innerHtml = item.description && item.description

	return (
		<>
			<Link to={`/products/${item.id}`} state={{ from: item.id }}>
				<img src={item.image_url} alt={`${item.title} thumbnail`} />
				<h2>{item.title}</h2>
				<p>{addFloatingPoint(item.price)}&euro;</p>
				<p>{item.description && item.description}</p>
				{/* <p ref={description}>{item.description && item.description}</p> */}
				{/* <p ref={description}></p> */}
			</Link>
			<hr />
		</>
	);
}

export default ProductsListItem;
