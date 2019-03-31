import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
const setminmax = value => {
	return Math.max(0, Math.min(value, 255));
};
export default class Brightness extends Component {
	static contextType = Context;
	increaseContrast = () => {
		let { context: ctx } = this.context.getContext2d();
		let {
			cursor: { x, y },
			size
		} = this.context.getCursor();
		console.log(x - size / 2, y - size / 2);
		let imageData = ctx.getImageData(
			x - size / 2,
			y - size / 2,
			size,
			size
		);
		const contrast = 100;
		const contrast_factor =
			(259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast)); //10% increase
		let dataArray = imageData.data;
		for (var i = 0; i < dataArray.length; i += 4) {
			dataArray[i] = setminmax(
				contrast_factor * (dataArray[i] - 128) + 128
			);
			dataArray[i + 1] = setminmax(
				contrast_factor * (dataArray[i + 1] - 128) + 128
			);
			dataArray[i + 2] = setminmax(
				contrast_factor * (dataArray[i + 2] - 128) + 128
			);
		}
		ctx.putImageData(imageData, x - size / 2, y - size / 2);
	};
	render() {
		return <button onClick={this.increaseContrast}>Contrast</button>;
	}
}
