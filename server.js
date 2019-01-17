const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.json('Hello World');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server listening on port 5000'));
