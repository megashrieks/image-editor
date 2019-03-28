import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
import EdgeDetection from "../EdgeDetection";

export default class SobelFilter extends Component {
    static contextType = Context;
    
    horizontalKernel = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
	verticalKernel = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];

	render() {
		return (
			<div style = {{ lineHeight: "20px" }}>
                <EdgeDetection
                    kernel = { this.horizontalKernel }
                >SobelH</EdgeDetection>
                
                <EdgeDetection
                    kernel = { this.verticalKernel }
                >SobelV</EdgeDetection>
            </div>
		)
	}
}
