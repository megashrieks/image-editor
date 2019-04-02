import React, { Component } from "react";
import { CanvasContext as Context } from "../../context/CanvasContext";
import { convolute } from "../";

export default class LaplacianFilter extends Component {
    static contextType = Context;
    
    kernel1 = [
		[0, 1, 0],
		[1, -4, 1],
		[0, 1, 0]
    ];
    
    kernel2 = [
		[1, 1, 1],
		[1, -8, 1],
		[1, 1, 1]
	];

	laplacianFilter = (e) => {
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
        let newImageData;
		if(e.target.value === "1")
            newImageData = convolute(imageData, this.kernel2, size);
        else
            newImageData = convolute(imageData, this.kernel1, size);
        
		ctx.putImageData(newImageData, x - size / 2, y - size / 2);
	};

	render() {
		return (
			<div style = {{ lineHeight: "20px" }}>
                <button value = { 1 } onClick={this.laplacianFilter}>Laplacian 1</button>
                <button value = { 2 } onClick={this.laplacianFilter}>Laplacian 2</button>
            </div>
		)
	}
}
