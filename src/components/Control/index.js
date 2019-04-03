import React, { Component } from "react";
import "./style.css";
import ImageUpload from "../ImageUpload/";
import ImageReset from "../ImageReset";
import ImageNegate from "../ImageNegate";
import GrayScale from "../GrayScale";
import ImageBlur from "../ImageConvolution/ImageBlur/BoxBlur";
import GaussianBlur from "../ImageConvolution/ImageBlur/GaussianBlur";
import LaplacianFilter from "../ImageConvolution/LaplacianFilter";
import SobelFilter from "../SobelFilter";
import PerwittFilter from "../PerwitttFilter";
import Brightness from "../Brightness";
import Contrast from "../Contrast";
import HistogramEqualization from "../HistogramEqualization";
import { CanvasContext as Context } from "../context/CanvasContext";

export default class Control extends Component {
	static contextType = Context;
	state = {
		open: false
	};
	toggleDropdown = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}));
	};
	download = () => {
		let canvas = this.context.getCanvas().canvas;
		let data = canvas.toDataURL();
		var link = document.createElement("a");
		link.download = "download.png";
		link.href = data;
		link.click();
	}
	render() {
		let list = [
			<ImageReset key={1} />,
			<GrayScale key= {11}/>,
			<ImageNegate key={2} />,
			<ImageBlur key={3} />,
			<GaussianBlur key={4} />,
			<LaplacianFilter key={5} />,
			<SobelFilter key={6} />,
			<PerwittFilter key={7} />,
			<Brightness key={8} />,
			<Contrast key={9} />,
			<HistogramEqualization key={10} />
		];
		return (
			<div className="sidebar">

				<ImageUpload />
				<div className="dropdown">
					<div
						className="dropdown-label"
						onClick={this.toggleDropdown}
					>
						<i className="fa fa-angle-right" />
					</div>
					{this.state.open && (
						<div className="dropdown-content">{list}</div>
					)}
				</div>
				<div className = "list" onClick = {this.download}>
						<i className = "fa fa-download"/>
				</div>
			</div>
		);
	}
}
