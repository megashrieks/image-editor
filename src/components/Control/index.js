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
	state = {
		open: true
	};
	toggleDropdown = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}));
	};
	render() {
		let list = [
			<ImageReset key={1} />,
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
			</div>
		);
	}
}
