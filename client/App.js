import React from "react";

const App = () => {
  
	return (
		<div className="App">
			<h1>Testing!!</h1>

			<div className="form">
				<label>Anime Name</label>
				<input type="text" name="animeName" />
				<label>Review</label>
				<input type="text" name="review" />

				<button>Submit</button>
			</div>
		</div>
	);
}

export default App;