import React, { Component, createContext } from "react";
const CanvasContext = createContext();
export class CanvasContextProvider extends Component {
	canvas = null;
	context2d = null;
	context3d = null;
	currentImage = null;
	state = {
		cursor: {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		},
		size: 350
	};
	componentDidMount() {
		window.addEventListener("wheel", this.handleCursorSize);
	}

	componentWillUnmount() {
		window.removeEventListener("wheel", this.handleCursorSize);
	}

	handleCursorSize = e => {
		this.setState(prev => ({
			size: Math.max(
				Math.min(prev.size + 15 * ((e.deltaY < 0) * 2 - 1), 1000),
				0
			)
		}));
	};

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
		canvas.width = window.innerWidth - 50;
		canvas.height = window.innerHeight;
		this.canvas = canvas;
		this.context2d = canvas.getContext("2d");
		this.currentImage = this.context2d.getImageData(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
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
		this.currentImage = this.context2d.getImageData(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	};
	setCursor = cursor => {
		this.setState({ cursor });
	};
	getCursor = () => {
		return {
			cursor: {
				x: this.state.cursor.x - this.canvas.offsetLeft,
				y: this.state.cursor.y + this.canvas.offsetTop
			},
			size: this.state.size
		};
	};
	getOriginalImage = () => {
		return this.currentImage;
	};
	render() {
		return (
			<CanvasContext.Provider
				value={{
					getDimensions: this.getDimensions,
					getContext2d: this.getContext2d,
					setImage: this.setImage,
					getOriginalImage: this.getOriginalImage,
					setCanvas: this.setCanvas,
					cursor: this.state.cursor,
					cursor_size: this.state.size,
					setCursor: this.setCursor,
					getCursor: this.getCursor
				}}
			>
				{this.props.children}
			</CanvasContext.Provider>
		);
	}
}
export { CanvasContext };
