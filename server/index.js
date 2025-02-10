const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")
const AuthRouter = require('./routes/AuthRouter')
const AvailabilityRouter = require('./routes/AvailabilityRoutes')
const UserRouter = require('./routes/UserRoutes')

require('dotenv').config();
require('./db/db')
const PORT = process.env.PORT || 9000;

app.get('/ping',(req,res) =>{
    res.send('pong')
})

app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', AuthRouter);
app.use("/api/availability", AvailabilityRouter);
app.use("/api/user", UserRouter);

app.listen(PORT , () =>{
    console.log(`server is running on ${PORT}`)
})


