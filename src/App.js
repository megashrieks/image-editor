import React, { Component } from "react";
import { CanvasContextProvider } from "./components/context/CanvasContext";
import Control from "./components/Control/";
import CanvasCreator from "./components/CanvasCreator";
class App extends Component {
	render() {
		return (
			<div className="App">
				<CanvasContextProvider>
					<div className="container">
						<Control />
						<CanvasCreator />
					</div>
				</CanvasContextProvider>
			</div>
		);
	}
}

export default App;
