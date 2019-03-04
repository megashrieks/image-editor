import React, { Component, createContext } from "react";
const CanvasContext = createContext();
export class CanvasContextProvider extends Component {
	render() {
		return (
			<CanvasContext.Provider
				value={{
					name: "shrikanth"
				}}
			>
				{this.props.children}
			</CanvasContext.Provider>
		);
	}
}
export { CanvasContext };
