import React, { Component } from "react";
import {
	CanvasContextProvider,
	CanvasContext
} from "./components/context/CanvasContext";
class App extends Component {
	render() {
		return (
			<div className="App">
				<CanvasContextProvider>
					<CanvasContext.Consumer>
						{({ name }) => name}
					</CanvasContext.Consumer>
				</CanvasContextProvider>
			</div>
		);
	}
}

export default App;
