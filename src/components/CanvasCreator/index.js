import React, { Component, createRef } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
import "./style.css";
export default class CanvasCreator extends Component {
	static contextType = Context;
	constructor(props) {
		super(props);
		this.canvasRef = createRef();
	}
	componentDidMount() {
		this.context.setCanvas(this.canvasRef.current);
	}
	render() {
		return (
			<div className="canvas-container">
				<canvas ref={this.canvasRef} />
			</div>
		);
	}
}
