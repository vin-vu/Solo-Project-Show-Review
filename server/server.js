const express = require('express');
//const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Review = require('./models/review');
const cors = require('cors')


// connect to mongodb
const dbURI = 'mongodb+srv://vincehvu:Zundoya1!@cluster0.gzx39.mongodb.net/anime-review?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3001))
	.catch((err) => console.log(err))

// express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all review
app.get('/api/get', (req, res) => {
	//console.log('Get request for all reviews')
	Review.find({}, (err, reviews) => {
		if (err) return console.log('Error retrieving reviews');
		res.send(reviews)
	});
});

// get 1 review
app.get('/api/:id', (req, res) => {
	console.log('Get request for single review')
	Review.findById({ _id: req.params.id }, (err, review) => {
		if (err) {
			console.log('Error retrieving a review')
		}
		res.json(review)
	});
});

// post a review
app.post('/api/insert', (req, res) => {
	console.log('Post a review');
	const newReview = new Review();
	newReview.animeName = req.body.animeName;
	newReview.review = req.body.review;
	newReview.save((err, insertedReview) => {
		if (err) {
			console.log(err)
		}
		res.json(insertedReview)
	});
});

// delete 1 review
app.delete('/api/delete', (req, res) => {
	const name = req.body.animeName
	Review.deleteOne({ animeName: name }, (err, review) => {
		if (err) {
			console.log('Error deleting a review')
		}
		res.json(review)
	});
});



// app.post('/api/insert', (req, res) => {

// 	db.query()
// });





// add a review
// app.get('/add-review', (req, res, next) => {
// 	const review = new Review ({
// 		title: 'naruto test3',
// 		review: 'I want to be the 8th hokage'
// 	});
// 	// review.save()
// 	// 	.then((result) => {
// 	// 		res.send(result)
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		console.log(err);
// 	// 	});
	
// 	// save method takes parem err and doc to be inserted into collection
// 	review.save((err, doc) => {
// 		if (err) return console.log(err);
// 		return res.send(doc)
// 	})
// });

// // retrieve all reviews
// app.get('/all-reviews', (reqs, res) => {
// 	Review.find({}, (err, reviews) => {
// 		if (err) return console.log(err);
// 		return res.send(reviews)
// 	})
// });



// app.get('/', (req, res) => {
// 	res.redirect('/all-reviews')
// })

// unknown route handler
app.use((req, res) => res.sendStatus(400));

// global error handler
app.use((req, res) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error has occured' }
	};
	const errObj = Object.assign(defaultErr, err);
	console.log('ERROR: ', errObj.message);
	return res.status(errObj.status).send(errObj.message);
})
