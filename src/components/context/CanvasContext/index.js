import React, { Component, createContext } from "react";
const CanvasContext = createContext();
export class CanvasContextProvider extends Component {
	canvas = null;
	context2d = null;
	context3d = null;

	getDimensions = () => {
		if (!this.canvas)
			return {
				width: null,
				height: null,
				error: new Error("Canvas Not initialised")
			};
		return {
			width: this.canvas.width,
			height: this.canvas.height,
			error: null
		};
	};
	getContext2d = () => {
		if (!this.canvas || !this.context2d)
			return {
				context: null,
				error: new Error("Canvas Not initialised")
			};
		return {
			context: this.context2d,
			error: null
		};
	};
	setCanvas = canvas => {
		console.log(canvas);
		canvas.width = window.innerWidth - 50;
		canvas.height = window.innerHeight;
		this.canvas = canvas;
		this.context2d = canvas.getContext("2d");
	};

	createImageObject = dataURI => {
		return new Promise((resolve, reject) => {
			let image = new Image();
			image.src = dataURI;
			image.onload = () => {
				resolve(image);
			};
		});
	};
	setImage = dataURI => {
		this.createImageObject(dataURI).then(this.drawImage);
	};
	drawImage = image => {
		this.context2d.drawImage(
			image,
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	};
	render() {
		return (
			<CanvasContext.Provider
				value={{
					getDimensions: this.getDimensions,
					getContext2d: this.getContext2d,
					setImage: this.setImage,
					setCanvas: this.setCanvas
				}}
			>
				{this.props.children}
			</CanvasContext.Provider>
		);
	}
}
export { CanvasContext };
