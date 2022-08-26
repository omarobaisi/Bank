const express = require("express");
const path = require("path");
const api = require("./server/routes/api");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb://localhost/bank";
mongoose.connect(url)
.then(() => {
  console.log('Mongo Connection Open');
})
.catch(err => {
  console.log('Mongo Connection Error');
  console.log(err);
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.use("/", api);

const PORT = 3000;
app.listen(process.env.PORT || PORT, function () {
  console.log(`Server running on ${PORT}`);
});
