const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const routeUser = require('./routes/user');
const routeNLetter = require('./routes/n_letter');
const routeContact = require('./routes/contact');
const cors = require("cors");
const multer  = require('multer');
const path = require("path");
// const server = require("server");

//connect to DB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("conected to DB"))
.catch(error =>console.log(error));

//midlewars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const upload = multer({ dest: 'uploads/' });

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use('/api', routeUser);
app.use('/api', routeNLetter);
app.use('/api', routeContact);

//end midlewars


// trieng to load the client from server
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res, next) => {
  res.sendFile(`${buildPath}/index.html`);
})


// const { PORT=4000, LOCAL_ADDRESS='0.0.0.0' } = process.env

const port = process.env.PORT || 5000;
app.listen(port, () => {

  console.log('buildPath '+buildPath)
  console.log('runnnn '+port)
})