import React, { Component } from "react";
import "./style.css";
import ImageUpload from "../ImageUpload/";
import ImageReset from "../ImageReset";
import ImageNegate from "../ImageNegate";
import ImageBlur from "../ImageBlur";
import GaussianBlur from "../GaussianBlur";
import SobelFilter from "../SobelFilter";
import PerwittFilter from "../PerwitttFilter";

export default class Control extends Component {
	render() {
		let list = [
			<ImageUpload />, 
			<ImageReset />,
			<ImageNegate />,
			<ImageBlur />,
			<GaussianBlur />,
			<SobelFilter />,
			<PerwittFilter />
		];
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
