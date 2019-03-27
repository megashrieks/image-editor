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
		this.context.setCursor({
			x: pageX,
			y: pageY
		});
	};
	render() {
		let { cursor, cursor_size: size } = this.context;
		// let left = this.canvasRef.current
		// 	? this.canvasRef.current.offsetLeft
		// 	: 0;
		// let top = this.canvasRef.current ? this.canvasRef.current.offsetTop : 0;
		// console.log(cursor.x - size / 2, cursor.x, left);
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
