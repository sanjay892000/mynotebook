const express = require('express');
const connectToDatabase = require('./database');
require('dotenv').config();
const app = express()
const port = process.env.PORT_BACK || 5000 
const cors = require('cors')

app.use(cors())
//call the database through client()
connectToDatabase();

app.use(express.json());
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