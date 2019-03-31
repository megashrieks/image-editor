import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";

export default class Brightness extends Component {
	static contextType = Context;
	increaseBrightness = () => {
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
		const brightness_factor = 1.1; //10% increase
		let dataArray = imageData.data;
		for (var i = 0; i < dataArray.length; i += 4) {
			dataArray[i] = Math.min(255, dataArray[i] * brightness_factor);
			dataArray[i + 1] = Math.min(
				255,
				dataArray[i + 1] * brightness_factor
			);
			dataArray[i + 2] = Math.min(
				255,
				dataArray[i + 2] * brightness_factor
			);
		}
		ctx.putImageData(imageData, x - size / 2, y - size / 2);
	};
	render() {
		return (
			<button onClick={this.increaseBrightness}>
				increase Brightness
			</button>
		);
	}
}
