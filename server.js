import express, { json, urlencoded } from 'express';
import fileUpload from 'express-fileupload';
import routes from './public/routes/routes.js';

var app = express();
const port = 3000 || process.env.port;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routes);

app.get('*', (req, res) => {
  res.status(404).json({
    error: true,
    type: 'Page does not exist.'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})