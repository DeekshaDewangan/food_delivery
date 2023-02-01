// Express helps a lot at developer point of view
const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db')
var cors = require("cors");

mongoDB(); 

// we are using this line because this is mandatory otherwise error will be thrown
// next is used to execute next code of line in the middleware
app.use(cors());


// This step is also needed an it is used to parse the incoming requests with JSON payloads and is based upon the bodyparser
// json() is a middleware function
app.use(express.json())  

// With the help of app.use when this endpoint will get hit then, createuser.js commands will run
app.use('/api', require("./Routes/createUser"))
app.use('/api', require("./Routes/displayData"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})