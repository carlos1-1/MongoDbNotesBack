const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const Routes = require('./routes/index.js');

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());

// Configuración del middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api', Routes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//mongodb coneccion
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("connected")).catch((error) => console.log(error));

app.listen(port, () => console.log('server listening on port', port));
