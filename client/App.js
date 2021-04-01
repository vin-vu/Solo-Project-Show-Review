import React, { useEffect, useState } from "react";
// import React, { Component } from 'react' 

const App = () => {
  const [animeName, setAnimeName] = useState("");
	const [review, setReview] = useState("");
	const [animeReviewList, setAnimeList] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3001/api/get')
		.then(res => res.json())
		.then(jsondata => setAnimeList(jsondata))
	}, []);

	const body = {
		animeName: animeName,
		review: review
	};

	const submitReview = () => {

		fetch('http://localhost:3001/api/insert', {
			method: 'post',
			headers: {'Content-Type': 'Application/JSON'},
			body: JSON.stringify(body)
		});
		
		setAnimeList([
			...animeReviewList,
			{ animeName: animeName, review: review}
		]);
	};

	const deleteReview = () => {
		fetch('http://localhost:3001/api/delete' + animeName, {
			method: 'DELETE'
		})
		.then(res => res.json())
		// .then(res => console.log(res))
	}

	return (
		<div className="App">
			<h1>Anime Reviews</h1>
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

				 {animeReviewList.map((val) => {

					 return (
					 <div className="card">
						 <h2>{val.animeName}</h2>
						 <p>{val.review}</p>

						<div className="modify">
							<button onClick={deleteReview}>Delete</button>
							<input type="text" id="updateInput"/>
							<button>Edit</button>

						</div>
					</div>
					 );
				 })}
			</div>
		</div>
	);
};

// class App extends Component {
//   constructor(props) {
// 		super(props);
// 		this.state = {
// 			animeName: '',
// 			review: ''
// 		};
// 		this.submitReview = this.submitReview.bind(this);
// 		this.handleChange = this.handleChange.bind(this);
// 	}

// 	 submitReview() {

// 		fetch('http://localhost:3001/api/insert', {
// 			method: 'post',
// 			headers: {'Content-Type': 'Application/JSON'},
// 			body: JSON.stringify({
// 				animeName: this.state.animeName,
// 				review: this.state.review
// 			})
// 		})
// 		.then(() => {
// 			alert('successful insert')
// 		})
// 	};
	
//   handleChange(e, field) {
//     this.setState({ [field]: e.target.value});
// 	}

// 	componentDidUpdate() {
// 		console.log(this.state)
// 	};

// 	render() {
// 		return (
// 			<div className="App">
	
// 				<div className="form">
// 					<label>Anime Name</label>
// 					<input type="text" name="animeName" onChange={(e)=>this.handleChange(e, 'animeName')}
// 						//this.animeName.setState(e.target.value)
// 						//this.setState({ animeName: this.handlerOnChange})
// 					/>
// 					<label>Review</label>
// 					<input type="text" name="review" onChange={(e)=>this.handleChange(e, 'review')}
// 						//this.review.setState(e.target.value)
// 						// this.setState({ review: e.target.value})
// 					/>
	
// 					<button onClick={submitReview}>Submit</button>
// 				</div>
// 			</div>
// 		);
// 	}
// }


export default App;