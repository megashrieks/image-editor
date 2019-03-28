import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
export default class ImageBlur extends Component {
	static contextType = Context;

	kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

    getPixelPos = (x, y, width) => {
        return ((y * width) + x) * 4;
    }

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
        const newImageData = new ImageData(new Uint8ClampedArray(imageData.data), size, size);
        const pixels = newImageData.data;
        const originalPixels = imageData.data;
        const klen = this.kernel[0].length;
        const halfKLen = klen >> 1;
        let i, r, g, b, tempRow, tempCol;

        for(let row = 0; row < size; ++row){
            for(let col = 0; col < size; ++col){
                i = this.getPixelPos(col, row, size);
                r = g = b = 0;
                for(let kr = row - halfKLen, m = 0; kr <= (row + halfKLen); ++kr, ++m){
                    for(let kc = col - halfKLen, n = 0; kc <= (col + halfKLen); ++kc, ++n){
						tempRow = kr;
						tempCol = kc;
						if(tempRow < 0)
							tempRow = 0;
						if(tempCol < 0)
							tempCol = 0;
						if(tempRow > (size - 1))
							tempRow = size - 1;
						if(tempCol > (size - 1))
							tempCol = size - 1;

						let tempPos = this.getPixelPos(tempCol, tempRow, size);
						r += originalPixels[tempPos];
						g += originalPixels[tempPos + 1];
						b += originalPixels[tempPos + 2];
                    }
                }
                pixels[i] = r/(klen*klen);
                pixels[i + 1] = g/(klen*klen);
                pixels[i + 2] = b/(klen*klen);
            }
        }
		ctx.putImageData(newImageData, x - size / 2, y - size / 2);
	};
	render() {
		return <button onClick={this.blur}>Blur</button>;
	}
}
