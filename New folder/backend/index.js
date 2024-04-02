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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
  console.log(`backend app listening on port http://localhost:${port}`)
});