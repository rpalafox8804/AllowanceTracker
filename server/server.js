const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config();
require("./config/mongoose.config");
    
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));
    
const AllMyUserRoutes = require("./routes/user.routes");
const AllMyChoreRoutes = require("./routes/chore.routes");
AllMyUserRoutes(app);
AllMyChoreRoutes(app);
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));