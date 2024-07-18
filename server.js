const dotenv = require('dotenv');
const express =require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

 
//Create a new express application with the name of firebaseServer:
const firebaseServer = express();

//Call dotr env config to get access to our private environment veriables:
dotenv.config(); 

//Create CORS middleware:
firebaseServer.use(cors());

//Create body parser middleware:
firebaseServer.use(bodyParser.json());
firebaseServer.use(bodyParser.urlencoded({ extended: false }));

//Set the CORS headers:
firebaseServer.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Create a Route to test the connection Below:
firebaseServer.get("/", (req, res) =>{
    res.send("Server Running!");
});

//Server Error Handling: 
firebaseServer.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

//Server Port Listening at 54441 and or 3000:
const port = process.env.SERVER_PORT || 3000;
firebaseServer.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

//Export the firebaseServer:
module.exports = firebaseServer;