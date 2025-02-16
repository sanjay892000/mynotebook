const express = require('express');
const connectToDatabase = require('./database');
require('dotenv').config();
const cors = require('cors');
const app = express()

const port = process.env.PORT_BACK || 5000
/* const allowedOrigins = ['https://mynotebook-two.vercel.app', 'http://localhost:3000']; */
app.use(cors({
  origin:'*',
  methods: "GET,POST,PUT,DELETE",
  headers: "Content-Type, auth-token",
  credentials: true
}))

app.use(express.json());

/* // setup session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
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

app.use('/api/auth', require('./routes/googleLoginRouter'));
app.use('/api/image', require("./routes/image"));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
  console.log(`backend app listening on port http://localhost:${port}`)
});