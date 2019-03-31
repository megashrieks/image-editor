import React, { Component } from "react";
import "./style.css";
import ImageUpload from "../ImageUpload/";
import ImageReset from "../ImageReset";
import ImageNegate from "../ImageNegate";
import ImageBlur from "../ImageConvolution/ImageBlur/BoxBlur";
import GaussianBlur from "../ImageConvolution/ImageBlur/GaussianBlur";
import LaplacianFilter from "../ImageConvolution/LaplacianFilter";
import SobelFilter from "../SobelFilter";
import PerwittFilter from "../PerwitttFilter";
import Brightness from "../Brightness";
import Contrast from "../Contrast";
import HistogramEqualization from "../HistogramEqualization";

export default class Control extends Component {
	render() {
		let list = [
			<ImageUpload />,
			<ImageReset />,
			<ImageNegate />,
			<ImageBlur />,
			<GaussianBlur />,
			<LaplacianFilter />,
			<SobelFilter />,
			<PerwittFilter />,
			<Brightness />,
			<Contrast />,
			<HistogramEqualization />
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
