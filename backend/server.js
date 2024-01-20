const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

// routes
var getItem = require('./routes/equipment');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup API endpoints
app.use('/equipment',getItem);
app.use('/borrow',require('./routes/borrow'));

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
