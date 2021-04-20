require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./controller/models/user');
const petsRouter = require('./controller/routes/animal');
const userRouter = require('./controller/routes/user');
app.use(bodyParser.json());
const mongoUrl = process.env.MONGO_URL;
const secret = process.env.TOKEN_SECRET;
const dbConnection = mongoose.connect(mongoUrl);
console.log({ mongoUrl })
  ;

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, secret, async (err, userSign) => {
    if (err) return res.status(403).send("invalid token");
    console.log({ userSign })
    req.user = await User.findOne({ _id: userSign._id }).exec();
    console.log({ user: req.user });
    next(); // pass the execution off to whatever request the client intended
  });
}

app.use(bodyParser.json());
app.use(cors());
app.use('/pets', authenticateToken, petsRouter);
app.use('/user',userRouter);
app.use('*', async (req, res) => {
  res.send('app works!')
})

app.listen(3333, async () => {
  await dbConnection;
  console.log('database connected!');
  console.log('listening on http://localhost:3333');
})