const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
	res.send('here')
})

app.listen(3001, () => {
  console.log('running on port 3001');
});