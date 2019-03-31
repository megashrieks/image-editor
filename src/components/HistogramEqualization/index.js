import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
import { histogramEqualize } from "./histogramEqualize";

export default class HistogramEqualization extends Component {
	static contextType = Context;

	histEq = () => {
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
		
		const newImageData = histogramEqualize(imageData, size);
		
		ctx.putImageData(newImageData, x - size / 2, y - size / 2);
	};
	render() {
		return <button onClick={this.histEq}>Histogram Equalize</button>;
	}
}
