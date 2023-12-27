
const express = require("express");
require("dotenv").config();
// const PORT = process.env.PORT || 3031;
const PORT = 8080;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
require('./config/db.js')
const user_router = require('./routers/artist.router.js');
const publisher_router = require('./routers/publisher.router.js'); 

app.use('/api/users', user_router);
app.use('/api/publishers', publisher_router);
  
app.listen(PORT, () => {
    console.log(`app listening on PORT:${PORT}`);
  });
  
  