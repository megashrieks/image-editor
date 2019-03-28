import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
import EdgeDetection from "../EdgeDetection";

export default class PerwittFilter extends Component {
    static contextType = Context;
    
	verticalKernel = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
    horizontalKernel = [[1, 1, 1], [0, 0, 0], [-1, -1, -1]];

	render() {
		return (
			<div style = {{ lineHeight: "20px" }}>
                <EdgeDetection
                    kernel = { this.horizontalKernel }
                >PerwittH</EdgeDetection>
                
                <EdgeDetection
                    kernel = { this.verticalKernel }
                >PerwittV</EdgeDetection>
            </div>
		)
	}
}
