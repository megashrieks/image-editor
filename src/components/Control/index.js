import React, { Component } from "react";
import "./style.css";
import ImageUpload from "../ImageUpload/";
import ImageBlur from "../ImageBlur";
export default class Control extends Component {
	render() {
		let list = [<ImageUpload />, <ImageBlur />];
		return (
			<div className="sidebar">
				{list.map((element, index) => (
					<div className="list" key={index}>
						{element}
					</div>
				))}
			</div>
		);
	}
}
