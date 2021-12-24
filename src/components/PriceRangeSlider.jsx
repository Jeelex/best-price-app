import React from "react";
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
} from "@chakra-ui/react";

function PriceRangeSlider() {
	return (
		<RangeSlider
			aria-label={["min", "max"]}
			colorScheme="pink"
			defaultValue={[10, 30]}
		>
			<RangeSliderTrack>
				<RangeSliderFilledTrack />
			</RangeSliderTrack>
			<RangeSliderThumb index={0} />
			<RangeSliderThumb index={1} />
		</RangeSlider>
	);
}

export default PriceRangeSlider;
