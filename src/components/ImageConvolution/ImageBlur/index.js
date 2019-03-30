import React, { Component } from "react";
import { CanvasContext as Context } from "../../context/CanvasContext";
import { convolute } from "../";

export default class ImageBlur extends Component {
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
		
		const newImageData = convolute(imageData, this.props.kernel, size);
		
		ctx.putImageData(newImageData, x - size / 2, y - size / 2);
	};
	render() {
		return <button onClick={this.blur}>{ this.props.children }</button>;
	}
}
