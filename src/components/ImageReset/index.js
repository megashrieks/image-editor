import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
export default class ImageReset extends Component {
    static contextType = Context;

	resetImage = () => {
		let { context: ctx } = this.context.getContext2d();
		let imageData = this.context.getOriginalImage();
		ctx.putImageData(imageData, 0, 0);
	};
	render() {
		return <button onClick={this.resetImage}>Reset</button>;
	}
}
