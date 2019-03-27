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
	changeCursor = ({ pageX, pageY }) => {
		this.context.setCursor({
			x: pageX - this.canvasRef.current.offsetLeft,
			y: pageY - this.canvasRef.current.offsetTop
		});
	};
	render() {
		let { cursor, cursor_size: size } = this.context;
		let left = this.canvasRef.current
			? this.canvasRef.current.offsetLeft
			: 0;
		let top = this.canvasRef.current ? this.canvasRef.current.offsetTop : 0;
		return (
			<div className="canvas-container">
				<div
					className="cursor"
					style={{
						top: cursor.y + top - size / 2 + "px",
						left: cursor.x + left - size / 2 + "px",
						width: size + "px",
						height: size + "px"
					}}
					onClick={this.changeCursor}
				/>
				<canvas ref={this.canvasRef} onClick={this.changeCursor} />
			</div>
		);
	}
}
