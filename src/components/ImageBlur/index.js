import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
export default class ImageBlur extends Component {
	static contextType = Context;
	blur = () => {
		let { context: ctx } = this.context.getContext2d();
		let { width, height } = this.context.getDimensions();
		let imageData = ctx.getImageData(0, 0, width, height);
		let dataArray = imageData.data;
		for (var i = 0; i < dataArray.length; i += 4) {
			dataArray[i] = 255 - dataArray[i];
			dataArray[i + 1] = 255 - dataArray[i + 1];
			dataArray[i + 2] = 255 - dataArray[i + 2];
		}
		ctx.putImageData(imageData, 0, 0);
	};
	render() {
		return <button onClick={this.blur}>Negative</button>;
	}
}
