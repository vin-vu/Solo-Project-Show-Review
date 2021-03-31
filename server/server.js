const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Review = require('./models/review');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://vincehvu:Zundoya1!@cluster0.gzx39.mongodb.net/anime-review?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3001))
	.catch((err) => console.log(err))

app.get('/add-review', (req, res) => {
	const review = new Review ({
		title: 'naruto test2',
		review: 'I want to be the 7th hokage'
	});
	review.save()
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/', (req, res) => {
	res.send('here me')
})

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
