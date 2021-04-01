import React, { useState } from "react";

const App = () => {
  const [animeName, setAnimeName] = useState("");
	const [review, setReview] = useState("");

	const body = {
		animeName: animeName,
		review: review
	};

	const submitReview = () => {

		fetch('http://localhost:3001/reviews/insert', {
			method: 'post',
			headers: {'Content-Type': 'Application/JSON'},
			body: JSON.stringify(body)
		})
		.then(() => {
			console.log(body.animeName)
			alert('successful insert')
		})
	};

	return (
		<div className="App">

			<div className="form">
				<label>Anime Name</label>
				<input 
				type="text" 
				name="animeName"
				onChange={(e) => {
					setAnimeName(e.target.value);
				 }}
				/>
				<label>Review</label>
				<input 
				type="text"
				name="review"
				onChange={(e) => {
					setReview(e.target.value);
				 }}			
				/>

				<button onClick={submitReview}>Submit</button>
			</div>
		</div>
	);
}

// class App extends Component {
//   constructor(props) {
// 		super(props);
// 		this.state = {
// 			animeName = '',
// 			review = ''
// 		};
// 	}
// 	render() {
// 		return (
// 			<div className="App">
// 				<h1>Testing!!</h1>
	
// 				<div className="form">
// 					<label>Anime Name</label>
// 					<input type="text" name="animeName" onChange={(e)=> {
// 						this.animeName.setState(e.target.value)
// 					}}/>
// 					<label>Review</label>
// 					<input type="text" name="review" onChange={(e)=> {
// 						this.review.setState(e.target.value)
// 					}}/>
	
// 					<button>Submit</button>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default App;