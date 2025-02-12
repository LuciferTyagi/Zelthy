const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const cors = require("cors")
const AuthRouter = require('./routes/AuthRouter')
const AvailabilityRouter = require('./routes/AvailabilityRoutes')
const UserRouter = require('./routes/UserRoutes')
const DailyAvailabilityRouter = require("./routes/DailyAvailabilityRoutes");
require('dotenv').config();
require('./db/db')
const PORT = process.env.PORT || 9000;

app.get('/ping',(req,res) =>{
    res.send('pong')
})

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', AuthRouter);
app.use("/api/availability", AvailabilityRouter);
app.use("/api/daily-availability", DailyAvailabilityRouter);
app.use("/api/user", UserRouter);

app.listen(PORT , () =>{
    console.log(`server is running on ${PORT}`)
})


