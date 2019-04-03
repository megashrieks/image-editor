import React, { Component } from "react";
import { CanvasContext as Context } from "../../../context/CanvasContext";
import ImageBlur from "../";

export default class GaussianBlur extends Component {
    static contextType = Context;

	kernel = [
		[1/273, 4/273, 6/273, 4/273, 1/273],
		[4/273, 16/273, 24/273, 16/273, 4/273],
		[6/273, 24/273, 36/273, 24/273, 6/273],
		[4/273, 16/273, 24/273, 16/273, 4/273],
		[1/273, 4/273, 6/273, 4/273, 1/273]
	]

	render() {
		return (
            <ImageBlur 
                kernel = { this.kernel }
            >Gaussian blur</ImageBlur>
		)
	}
}
