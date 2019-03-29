import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";

export default class GaussianBlur extends Component {
	static contextType = Context;

	kernel = [
		1/256, 4/256, 6/256, 4/256, 1/256,
		4/256, 16/256, 24/256, 16/256, 4/256,
		6/256, 24/256, 36/256, 24/256, 6/256,
		4/256, 16/256, 24/256, 16/256, 4/256,
		1/256, 4/256, 6/256, 4/256, 1/256
	]

	getPixelPos = (x, y, width) => {
		return ((y * width) + x) * 4;
	}

	gaussianBlur = () => {
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
		const newImageData = new ImageData(new Uint8ClampedArray(imageData.data), size, size);
		const pixels = newImageData.data;
		const originalPixels = imageData.data;
		const klen = Math.round(Math.sqrt(this.kernel.length));
		const halfKLen = klen >> 1;
		let i, r, g, b, tempRow, tempCol;

		for(let row = 0; row < size; ++row){
			for(let col = 0; col < size; ++col){
				i = this.getPixelPos(col, row, size);
				r = g = b = 0;
				for(let kr = 0; kr < klen; ++kr){
					for(let kc = 0; kc < klen; ++kc){
						tempRow = row + kr - halfKLen;
                        tempCol = col + kc - halfKLen;
                        if (tempRow >= 0 && tempRow < size && tempCol >= 0 && tempCol < size) {
							var srcOff = this.getPixelPos(tempCol, tempRow, size);
                            var wt = this.kernel[kr * klen + kc];
                            r += originalPixels[srcOff] * wt;
                            g += originalPixels[srcOff + 1] * wt;
                            b += originalPixels[srcOff + 2] * wt;
                        }
					}
				}
				
				pixels[i] = r;
				pixels[i + 1] = g;
				pixels[i + 2] = b;
			}
		}
		ctx.putImageData(newImageData, x - size / 2, y - size / 2);
	};
	render() {
		return <button onClick={this.gaussianBlur}>Gaussian Blur</button>;
	}
}
