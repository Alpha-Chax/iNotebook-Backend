const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const path = require('path')

//TEST 1
connectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//--------------DEVELOPMENT----------------------------
__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/Client/build')));
  app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"))
  })
}

//--------------DEVELOPMENT-----------------------------

app.listen(port, () => {
  console.log(`iNotebook backend listening on PORT ${port}`)
})