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
		this.changeCursor({
			pageX: window.innerWidth / 2,
			pageY: window.innerHeight / 2
		});
	}
	changeCursor = ({ pageX, pageY }) => {
		console.log(Math.max(pageX-this.context.cursor_size,50))
		this.context.setCursor({
			x: Math.min(Math.max(pageX,50+this.context.cursor_size/2),window.innerWidth - this.context.cursor_size/2),
			y: Math.min(Math.max(pageY,this.context.cursor_size/2),window.innerHeight - this.context.cursor_size/2)
		});
	};
	render() {
		let { cursor, cursor_size: size } = this.context;
		return (
			<div className="canvas-container">
				<div
					className="cursor"
					style={{
						top: cursor.y - size / 2 + "px",
						left: cursor.x - size / 2 + "px",
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
