import React, { Component } from "react";
import { CanvasContext as Context } from "../context/CanvasContext";
export default class ImageUpload extends Component {
	static contextType = Context;
	changeImage = ({ target: { files } }) => {
		let reader = new FileReader();
		reader.onload = () => {
			this.context.setImage(reader.result);
		};
		reader.readAsDataURL(files[0]);
	};
	render() {
		return (
			<label className="file-upload">
				<i className="fa fa-upload" />
				<input type="file" onChange={this.changeImage} />
			</label>
		);
	}
}
