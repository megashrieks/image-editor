import React, { Component } from "react";
import { CanvasContext as Context } from "../../../context/CanvasContext";
import ImageBlur from "../";

export default class BoxBlur extends Component {
    static contextType = Context;
    
    kernel = [
        [1/9, 1/9, 1/9], 
        [1/9, 1/9, 1/9], 
        [1/9, 1/9, 1/9]
    ];

	render() {
		return (
            <ImageBlur 
                kernel = { this.kernel }
            >Box blur</ImageBlur>
		)
	}
}
