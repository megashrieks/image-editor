import React, { Component } from "react";
import { CanvasContext as Context } from "../../../context/CanvasContext";
import ImageBlur from "../";

export default class GaussianBlur extends Component {
    static contextType = Context;

	kernel = [
		[1/256, 4/256, 6/256, 4/256, 1/256],
		[4/256, 16/256, 24/256, 16/256, 4/256],
		[6/256, 24/256, 36/256, 24/256, 6/256],
		[4/256, 16/256, 24/256, 16/256, 4/256],
		[1/256, 4/256, 6/256, 4/256, 1/256]
	]

	render() {
		return (
            <ImageBlur 
                kernel = { this.kernel }
            >Gaussian blur</ImageBlur>
		)
	}
}
