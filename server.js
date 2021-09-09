const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./public/routes/routes.js');

var app = express();
const port = 3000 || process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routes);
app.get('/', (req, res) => {
  console.log(req);
  res.send('TEST');
})

app.get('*', (req, res) => {
  res.status(404).json({
    error: true,
    type: 'Page does not exist.'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})