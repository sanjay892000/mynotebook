const express = require('express');
const connectToDatabase = require('./database');
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT_BACK || 5000 
const app = express()

app.use(express.json());
app.use(cors({
    origin:"*",
    methods:"GET,POST,PUT,DELETE",
    headers:"Content-Type, auth-token, Authorization",
    credentials:true
}))

//Handle preflight OPTIONS request
app.options('*', cors());

// Enable CORS for all requests
/* app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  // Allow GET, POST, PUT, DELETE methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Allow Content-Type and Authorization headers
  res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token, Authorization');
  // Allow credentials to be included in the request
  res.header('Access-Control-Allow-Credentials', true);
  // Cache preflight request for 1 hour
  res.header('Access-Control-Max-Age', 3600);
  next();
}); */

/* // Allow requests from 'http://localhost:3000'
app.use(cors({
  origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true}
));

// Handle preflight requests
app.options('*', cors());
 */
//call the database through client()
connectToDatabase();

app.get('/', (req, res) => {
  try {
    res.status(200).json({ msg: "I am in home route" });
  } catch (error) {
    res.status(500).json({ msg: "Error in home route" });
  }
});
app.use(express.static("uploads"))
app.use(express.static("Images"))
app.use("/api/image", require("./routes/image"))

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
  console.log(`backend app listening on port http://localhost:${port}`)
});