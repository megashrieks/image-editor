import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";

export default class GrayScale extends Component {
	static contextType = Context;
	blur = () => {
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
		let dataArray = imageData.data;
		for (var i = 0; i < dataArray.length; i += 4) {
            let total = (dataArray[i] + dataArray[i+1] + dataArray[i+2]) / 3;
			dataArray[i] = total;
			dataArray[i + 1] = total;
			dataArray[i + 2] = total;
		}
		ctx.putImageData(imageData, x - size / 2, y - size / 2);
	};
	render() {
		return <button onClick={this.blur}>GrayScale</button>;
	}
}
