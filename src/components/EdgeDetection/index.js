import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
export default class EdgeDetection extends Component {
    static contextType = Context;

    getPixelPos = (x, y, width) => {
        return ((y * width) + x) * 4;
    }

	edgeDetect = () => {
        let { context: ctx } = this.context.getContext2d();
        let {
			cursor: { x, y },
			size
		} = this.context.getCursor();
		let imageData = ctx.getImageData(
			x - size / 2,
			y - size / 2,
			size,
			size
		);
        const newImageData = new ImageData(new Uint8ClampedArray(imageData.data), size, size);
        const pixels = newImageData.data;
        const originalPixels = imageData.data;
        const klen = this.props.kernel[0].length;
        const halfKLen = klen >> 1;
        let i, sum, avg;

        for(let row = halfKLen; row < (size - halfKLen); ++row){
            for(let col = halfKLen; col < (size - halfKLen); ++col){
                i = this.getPixelPos(col, row, size);
                sum = 0;
                for(let kr = row - halfKLen, m = 0; kr <= (row + halfKLen); ++kr, ++m){
                    for(let kc = col - halfKLen, n = 0; kc <= (col + halfKLen); ++kc, ++n){
                        let temp = this.getPixelPos(kc, kr, size);
                        avg = (
                            originalPixels[temp] 
                            + originalPixels[temp + 1]
                            + originalPixels[temp + 2]
                        ) / 3;
                        sum += (avg * this.props.kernel[m][n]);
                    }
                }
                pixels[i] = sum;
                pixels[i + 1] = sum;
                pixels[i + 2] = sum;
            }
        }
		ctx.putImageData(newImageData, x - size / 2, y - size / 2);
	};
	render() {
		return (
            <button onClick={this.edgeDetect}>{ this.props.children }</button>
        );
	}
}
