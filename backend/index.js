//inde.js is main file it means index.js handled by all file

//first of all import all file , express etc
const express = require('express');
const connectToDatabase = require('./database');
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
//call the database through client()
connectToDatabase();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Use the schema')
})
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});
