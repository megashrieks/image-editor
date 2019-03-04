import React, { Component } from "react";
import "./style.css";
export default class CanvasCreator extends Component {
	render() {
		return (
			<div className="canvas-container">
				<canvas />
			</div>
		);
	}
}
